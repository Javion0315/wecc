import axios from 'axios';

// const BaseUrl = "http://yang332904.synology.me:8080/api/"
// const BaseUrl = "https://wecc.elfbar.tw:8080/api/"
const BaseUrl = '/api/'

// axios.defaults.withCredentials = true
// axios.defaults.baseURL = null
// axios.defaults.timeout = 60 * 1000 //timeout 60秒


const weccApi = axios.create({
  baseURL: BaseUrl
});

export { weccApi }
