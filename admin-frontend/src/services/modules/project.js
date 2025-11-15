import request from '../request'

export const fetchProjects = (params) => request.get('/projects', { params })

export const fetchProjectPages = (projectId) => request.get(`/projects/${projectId}/pages`)

export const savePageSchema = (projectId, pageId, data) =>
  request.post(`/projects/${projectId}/pages/${pageId}`, data)

