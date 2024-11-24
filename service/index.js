import axios from 'axios';

// const pingTungBaseUrl = 'http://yang332904.synology.me:8888/pthgAPI/api/'
// const pingTungBaseUrl = 'http://43.254.16.32:8888/pthgAPI/api/'
const pingTungBaseUrl = "https://pge.elfbar.tw:8080/pthgAPI/api/"

// axios.defaults.withCredentials = true
// axios.defaults.baseURL = null
// axios.defaults.timeout = 60 * 1000 //timeout 60秒


const ptApi = axios.create({
  baseURL: pingTungBaseUrl
});




// ptApi.interceptors.response.use(
//   response => response,
//   (error) => {
//     if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
//       $nuxt.$toast.show({
//         message: `連線失敗，請您重新進行交易`,
//         classToast: "bg-red-500",
//       })
//     }
//     if (error.response.status === 401) {
//       $nuxt.$router.push({name: 'timeout'})
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

export { ptApi }
