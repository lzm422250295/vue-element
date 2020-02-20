import Mock from 'mockjs'
const data = Mock.mock({
  'items|10': [{
    id: '@id',
    title: '@county(true)',
    'status|1': ['published', 'draft', 'deleted'],
    author: '@cname',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    'year|1-100': 100,
    'sex|1': [
      '男',
      '女'
    ],
    'phone|1': /\d{1,11}\-/
  }]
})

export default [
  {
    url: '/table/list',
    type: 'get',
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
