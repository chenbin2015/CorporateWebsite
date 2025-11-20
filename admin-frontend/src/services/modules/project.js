import request from '../request'

export const fetchProjects = (params) => request.get('/projects', { params })

export const getProject = (id) => request.get(`/projects/${id}`)

export const createProject = (data) => request.post('/projects', data)

export const updateProject = (id, data) => request.put(`/projects/${id}`, data)

export const deleteProject = (id) => request.delete(`/projects/${id}`)

export const fetchProjectPages = (projectId) => request.get(`/projects/${projectId}/pages`)

export const getPage = (projectId, pageId) => request.get(`/projects/${projectId}/pages/${pageId}`)

export const createPage = (projectId, data) => request.post(`/projects/${projectId}/pages`, data)

export const updatePage = (projectId, pageId, data) =>
  request.put(`/projects/${projectId}/pages/${pageId}`, data)

export const saveDraft = (projectId, pageId, data) =>
  request.put(`/projects/${projectId}/pages/${pageId}/draft`, data)

export const publishPage = (projectId, pageId, data) =>
  request.post(`/projects/${projectId}/pages/${pageId}/publish`, data)

export const deletePage = (projectId, pageId) =>
  request.delete(`/projects/${projectId}/pages/${pageId}`)

// 兼容旧接口
export const savePageSchema = (projectId, pageId, data) =>
  saveDraft(projectId, pageId, data)

// 获取新闻详情（从页面配置中查找）
export const getNewsDetail = (projectCode, pageCode, newsId) =>
  request.get(`/projects/${projectCode}/pages/${pageCode}/news/${newsId}`)

