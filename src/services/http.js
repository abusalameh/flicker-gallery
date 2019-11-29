import axios from 'axios'
import env from '@/constants/env'

const url = `${env.default.BASE_URL}${env.default.FLICKER_API_KEY}`
// let promise;
let instance = axios.create({
  baseURL: url,
});

export default instance
// export default axios