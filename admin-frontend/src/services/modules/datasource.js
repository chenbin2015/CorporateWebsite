import request from '../request'

// 数据源管理
export const getDataSources = (projectCode, type = null) => {
  const params = type ? { type } : {}
  return request.get(`/projects/${projectCode}/data-sources`, { params })
}

export const getDataSource = (projectCode, dataSourceCode) =>
  request.get(`/projects/${projectCode}/data-sources/${dataSourceCode}`)

export const createDataSource = (projectCode, data) =>
  request.post(`/projects/${projectCode}/data-sources`, data)

export const updateDataSource = (projectCode, dataSourceCode, data) =>
  request.put(`/projects/${projectCode}/data-sources/${dataSourceCode}`, data)

export const deleteDataSource = (projectCode, dataSourceCode) =>
  request.delete(`/projects/${projectCode}/data-sources/${dataSourceCode}`)

// 数据源项管理
export const getDataSourceItems = (dataSourceCode) =>
  request.get(`/data-sources/${dataSourceCode}/items`)

export const getDataSourceItem = (dataSourceCode, itemCode) =>
  request.get(`/data-sources/${dataSourceCode}/items/${itemCode}`)

export const createDataSourceItem = (dataSourceCode, data) =>
  request.post(`/data-sources/${dataSourceCode}/items`, data)

export const updateDataSourceItem = (dataSourceCode, itemCode, data) =>
  request.put(`/data-sources/${dataSourceCode}/items/${itemCode}`, data)

export const deleteDataSourceItem = (dataSourceCode, itemCode) =>
  request.delete(`/data-sources/${dataSourceCode}/items/${itemCode}`)

export const reorderDataSourceItems = (dataSourceCode, itemOrders) =>
  request.put(`/data-sources/${dataSourceCode}/items/reorder`, { itemOrders })

