import Mock from 'mockjs'
const editData = Mock.mock(
  { 'id': '3a581002bb5148f9b00173c4d3d58ade', 'username': 'super', 'password': '******', 'name': '超级管理员', 'birthday': '20191112', 'address': 'testtttt', 'mobilePhone': '12345678', 'telPhone': '123456', 'email': '123458', 'sex': '女', 'type': '1', 'description': '121111', 'status': '1', 'crtUserName': '', 'crtUserId': '', 'crtTime': '2019-07-07 14:07:18', 'updUserName': '超级管理员', 'updUserId': '3a581002bb5148f9b00173c4d3d58ade', 'updTime': '2019-12-06 10:20:38', 'statusStr': '启用', 'isDeleted': '0', 'isDisabled': '0', 'departId': '3211', 'isSuperAdmin': '1', 'tenantId': 'ac88ceb386aa4231b09bf472cb937c24', 'lastLogonTime': '2019-11-12 12:12:22', 'logonNum': 1, 'pwdErrorNumb': 1, 'pwdModifyTime': '2019-11-12 12:12:22', 'userLockTime': '2019-11-12 12:12:22', 'compCode': '32110200023254', 'orgName': '镇江市市场监督管理局', 'groupName': '测试租户角色,董事长', 'departIds': ['3211', '3211', '3211'] }
)
const data = Mock.mock({
  'items|10': [{
    compCode: '@id',
    compName: '@county(true)',
    // 'status|1': ['published', 'draft', 'deleted'],
    issueCertCode: '@id',
    truename: '@cname',
    userRole: '@cname',
    lastLogonTime: '@datetime',
    'mphone|1': /\d{1,11}\-/
  }]
})
const check = Mock.mock(
  {
    id: '@id',
    username: '@county(true)',
    // 'status|1': ['published', 'draft', 'deleted'],
    name: '@cname',
    lastLogonTime: '@datetime',
    userLockTime: '@datetime',
    orgName: '@integer(300, 5000)',
    'year|1-100': 100,
    'sexStr|1': [
      '男',
      '女'
    ],
    'status|1': [
      '启用',
      '停用'
    ],
    'phone|1': /\d{1,11}\-/

  })
export default [
  {
    url: '/compUser/list',
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
  },
  {
    url: '/compUser/check',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: check
      }
    }
  },
  {
    url: '/compUser/edit',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: editData
      }
    }
  }
]
