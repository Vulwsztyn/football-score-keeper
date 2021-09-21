import axios from 'axios'

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8000',
})

export default myAxios
