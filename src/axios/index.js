/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import {get} from './tools';
import {post} from './tools'
import * as config from './config';
import {request} from './tools'
export const getPros = () => axios.post('http://api.xitu.io/resources/github', {
    category: "trending",
    period: "day",
    lang: "javascript",
    offset: 0,
    limit: 30
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {
    ...{
        client_id: '792cdcd244e98dcd2dee',
        client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
        redirect_uri: 'http://localhost:3006/',
        state: 'reactAdmin'
    }, code: code
}, {headers: {Accept: 'application/json'}})
    .then(res => res.data).catch(err => console.log(err));
export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
 export const admin = ({username, password}) => post({url: config.baseUrl + `/oauth/token?grant_type=password&client_id=game-web&client_secret=game-web&username=${username}&password=${password}`});

export const getGameList=(taskId)=>  request(config.baseUrl+`/game/list`,'get',{taskId});

export const getGameTaskList=(currentPage,pageSize)=> request(config.baseUrl+`/task/list`,'get',{currentPage,pageSize});

export const addGameTask=(data)=> request(config.baseUrl+`/task/add`,'post',data);

export const getGameUserList=()=> request(config.baseUrl+"/user/list",'get',{})

export const gameRecordList=(currentPage,pageSize,account,operator)=> request(config.baseUrl+"/record/list",'get',{currentPage,pageSize,account,operator});

export const updateGameRecord=(data)=>request(config.baseUrl+"/record/update",'post',data);

export const getGameRecordAccountList=()=> request(config.baseUrl+"/record/account-list",'get',{})

export const getGameStatisticsList=(time,account,operator)=> request(config.baseUrl+"/record/statistics/list",'get',{time,account,operator})

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});