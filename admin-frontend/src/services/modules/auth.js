import request from '../request'

export const login = (payload) => request.post('/auth/login', payload)

export const fetchProfile = () => request.get('/auth/profile')

