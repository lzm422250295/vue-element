import Mock from 'mockjs'

const data = Mock.mock({
  'x': [

  ],
  'y': [{

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
          pageSize: 12,
          pageNum: 1,
          total: list.length,
          list: list
        }
      }
    }
  }
]
