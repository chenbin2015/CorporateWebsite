import request from '../request'

// 查询操作日志
export const fetchLogs = (params) => request.get('/system/logs', { params })

// 导出日志
export const exportLogs = (params) => request.get('/system/logs/export', { 
  params,
  responseType: 'blob'
})

