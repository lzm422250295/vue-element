import Mock from 'mockjs'
const data = Mock.mock({
  'items|10': [{
    roleName: '@id',
    username: '@county(true)',
    // 'status|1': ['published', 'draft', 'deleted'],
    createUser: '@cname',
    lastModUser: '@cname',
    createTime: '@datetime',
    userLockTime: '@datetime',
    remark: '@integer(300, 5000)',
    'year|1-100': 100,
    'sexStr|1': [
      '男',
      '女'
    ],
    'enableStatus|1': [
      '启用',
      '停用'
    ],
    'phone|1': /\d{1,11}\-/
  }]
})

export default [
  {
    url: '/roleMage/list',
    type: 'post',
    response: config => {
      const list = data.items
      return {
        code: 200,
        data: {
          pageSize: 10,
          pageNum: 1,
          total: list.length,
          list: list
        }
      }
    }
  }
]
