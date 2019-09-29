/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import { message } from 'antd';


/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const get = ({url, msg = '接口异常', headers}) =>{
    return axios.get(url, headers);

}

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const post = ({url, data, msg = '接口异常', headers}) =>{
    console.log(url)
    return axios.post(url, data, headers)

}



export const request=(url, method, params = {}) =>{
    // 首先判断是get请求还是post请求
    let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
    return axios({
        method,
        url,
        [data]: params // 差异点在于data的值
    }).then((res) => {
        return Promise.resolve(res.data);
    }).catch((err) => {
        return Promise.reject(err);
    })
}