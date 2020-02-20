import request from '@/utils/request'

export function getTreeData() {
  return request({
    url: '/menu/treeData',
    method: 'get'
  })
}

export function getFormData() {
  return request({
    url: '/menu/formData',
    method: 'get'
  })
}
