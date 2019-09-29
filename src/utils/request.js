import fetch from "dva/fetch";

const wechatUrl = process.env.WECHAT_URL
const baseApi = `${process.env.BASE_URL}/cms/v1`
const imageUploadUrl = `${process.env.BASE_URL}/upload/image`
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    router.push("/login");
    return;
  }
  let errortext = "";
  try {
    const data = await response.json();
    if (data.error) {
      router.push("/login");
      return;
    }
    errortext = data.errMsg;
  } catch (error) {
    errortext = codeMessage[response.status] || response.statusText;
  }
  Notification.error({
    title: `请求错误 ${response.status}: ${response.url}`,
    description: errortext
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const defaultOptions = {
    // mode: "cors",
    // cache: "force-cache",
    credentials: "include"
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers
      };
    }
  }

  let tokenInfo = {};

  // 判断如果是登录请求，清除所有数据
  if (url.indexOf("login") > -1) {
    localStorage.clear();
  }

  // 获取登录后保存的token信息，如果没有token信息则认为是登录请求
  if (
    localStorage.getItem("TOKEN_INFO") !== null &&
    localStorage.getItem("TOKEN_INFO") !== "undefined"
  ) {
    tokenInfo = JSON.parse(localStorage.getItem("TOKEN_INFO"));
    let accessToken = tokenInfo.access_token;
    const refreshToken = tokenInfo.refresh_token;
    const invalidTime = tokenInfo.expires_in; // 剩余过期时间（秒）

    if (accessToken) {
      // 判断剩余失效时间小于1个小时，则刷新token信息
      const invalided = invalidTime && invalidTime < 60 * 60;

      if (invalided) {
        // 如果超过了规定的失效时间：通过refresh_token，重新拉取新的access_token
        newOptions.method = "POST";
        const refreshUrl = `/auth/oauth/token?client_id=cms-web&client_secret=cms-web&grant_type=refresh_token&refresh_token=${refreshToken}`;
        const refreshResponse = await fetch(baseApi + refreshUrl, newOptions);
        await checkStatus(refreshResponse);
        const refreshData = await refreshResponse.json();
        if (
          refreshData &&
          refreshData.access_token !== null &&
          refreshData.access_token !== "undefined"
        ) {
          accessToken = refreshData.access_token;
          localStorage.setItem("TOKEN_INFO", JSON.stringify(refreshData));
        }
      }

      // 将accessToken放入头部
      newOptions.headers = {
        Authorization: "Bearer " + accessToken,
        ...newOptions.headers
      };
    }
  } else if (!url.startsWith("/system/user/login")) {
    router.push("/login");
    return;
  }

  let requestUrl = "";
  if ((url.indexOf(wechatUrl) > -1) || (url.indexOf(imageUploadUrl) > -1)) {
    requestUrl = url;
  } else {
    requestUrl = baseApi + url;
  }
  console.log("requestUrl：" + requestUrl);
  return await fetch(requestUrl, newOptions)
    .then(response => {
      return checkStatus(response).then(() => {
        return response
          .clone()
          .json()
          .catch(e => response.text());
      });
    })
    .catch((e, response) => {
      console.log("responseStatus：" + e.name);
      console.log("responseContxt：" + e.response);
      const status = e.name;
      console.log("isNaN：" + isNaN(status));
      if (isNaN(status)) {
        return {};
      } else {
        if (status === 401) {
          router.push("/login");
          return;
        }
      }
    });
}
