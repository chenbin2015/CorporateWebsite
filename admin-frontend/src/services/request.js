import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message 
      || error.response?.data?.error 
      || error.message 
      || '请求失败'
    console.error('[API ERROR]', error.response?.data || error.message)
    return Promise.reject(new Error(message))
  },
)

export default request

