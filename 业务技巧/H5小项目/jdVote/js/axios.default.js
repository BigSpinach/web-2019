// if(typeof axios !== 'undefined'){//说明axios存在
//   //配置axios的默认配置信息
//   //axios.defaults.baseURL  = 'http://localhost:8000';
//   //axios.defaults.withCredentials = trun;//=允许跨域请求
//   axios.defaults.transformRequest = data=>{
//     let str =  ``;
//     if(data && typeof data === 'object'){
//       for(let attr in data){
//         if(data.hasOwnProperty(attr)){
//           str+=`${attr} = ${data[attr]}&`;
//         }
//       }
//     }
//     return str.substring(0,str.length-1);  
//   };
//   axios.defaults.headers['Content-Type'] = 'x-form-urlencoded';
//   axios.interceptors.response.use(result=> result.data);
// };

if (typeof axios !== 'undefined') {
  axios.defaults.baseURL = 'http://127.0.0.1:8080';
  axios.defaults.withCredentials = true;//=>允许跨域请求
  axios.defaults.transformRequest = data => {
      let str = ``;
      if (data && typeof data === 'object') {
          for (let attr in data) {
              if (data.hasOwnProperty(attr)) {
                  str += `${attr}=${data[attr]}&`;
              }
          }
      }
      return str.substring(0, str.length - 1);
  };
  axios.defaults.headers['Content-Type'] = 'x-www-form-urlencoded';
  axios.interceptors.response.use(result => result.data);
}