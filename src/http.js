import axios from 'axios'; 
const init=function(){
  axios.defaults.headers.common['user'] = '111';
}
export default {init}