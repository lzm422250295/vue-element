import Mock from 'mockjs'
const editData = Mock.mock(
  { 'id': '3a581002bb5148f9b00173c4d3d58ade', 'username': 'super', 'password': '******', 'name': '超级管理员', 'birthday': '20191112', 'address': 'testtttt', 'mobilePhone': '12345678', 'telPhone': '123456', 'email': '123458', 'sex': '女', 'type': '1', 'description': '121111', 'status': '1', 'crtUserName': '', 'crtUserId': '', 'crtTime': '2019-07-07 14:07:18', 'updUserName': '超级管理员', 'updUserId': '3a581002bb5148f9b00173c4d3d58ade', 'updTime': '2019-12-06 10:20:38', 'statusStr': '启用', 'isDeleted': '0', 'isDisabled': '0', 'departId': '3211', 'isSuperAdmin': '1', 'tenantId': 'ac88ceb386aa4231b09bf472cb937c24', 'lastLogonTime': '2019-11-12 12:12:22', 'logonNum': 1, 'pwdErrorNumb': 1, 'pwdModifyTime': '2019-11-12 12:12:22', 'userLockTime': '2019-11-12 12:12:22', 'compCode': '32110200023254', 'orgName': '镇江市市场监督管理局', 'groupName': '测试租户角色,董事长', 'departIds': ['3211', '3211', '3211'] }
)
const data = Mock.mock({
  'items|10': [{
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
const tree = Mock.mock(
  [{
    'checked': false,
    'children': [{
      'checked': false,
      'children': [{
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '镇江市京口区市场监督管理局第一分局',
        'parentId': '321102',
        'value': '32110201'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '镇江市京口区市场监督管理局第二分局',
        'parentId': '321102',
        'value': '32110202'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '镇江市京口区市场监督管理局第三分局',
        'parentId': '321102',
        'value': '32110203'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '镇江市京口区市场监督管理局第四分局',
        'parentId': '321102',
        'value': '32110204'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '镇江市京口区市场监督管理局第五分局',
        'parentId': '321102',
        'value': '32110205'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '镇江市京口区市场监督管理局第六分局',
        'parentId': '321102',
        'value': '32110206'
      }],
      'hasChildren': true,
      'hasParent': true,
      'label': '镇江市京口区市场监督管理局',
      'parentId': '3211',
      'value': '321102'
    }, {
      'checked': false,
      'hasChildren': false,
      'hasParent': true,
      'label': '镇江高新区市场监督管理局',
      'parentId': '3211',
      'value': '321108'
    }, {
      'checked': false,
      'children': [{
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局华阳分局',
        'parentId': '321183',
        'value': '32118301'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局黄梅分局',
        'parentId': '321183',
        'value': '32118302'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局下蜀分局',
        'parentId': '321183',
        'value': '32118303'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局天王分局',
        'parentId': '321183',
        'value': '32118304'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局后白分局',
        'parentId': '321183',
        'value': '32118305'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局郭庄分局',
        'parentId': '321183',
        'value': '32118306'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局茅山分局',
        'parentId': '321183',
        'value': '32118307'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局白兔分局',
        'parentId': '321183',
        'value': '32118308'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局边城分局',
        'parentId': '321183',
        'value': '32118309'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市市场监督管理局宝华分局',
        'parentId': '321183',
        'value': '32118310'
      }, {
        'checked': false,
        'hasChildren': false,
        'hasParent': true,
        'label': '句容市餐饮安全监督所',
        'parentId': '321183',
        'value': '32118350'
      }],
      'hasChildren': true,
      'hasParent': true,
      'label': '句容市市场监督管理局',
      'parentId': '3211',
      'value': '321183'
    }],
    'hasChildren': true,
    'hasParent': false,
    'label': '镇江市市场监督管理局',
    'parentId': '-1',
    'value': '3211'
  }]
)
export default [
  {
    url: '/systemUser/list',
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
    url: '/systemUser/init',
    type: 'post',
    response: config => {
      const adminDeptTree = tree
      return {
        code: 200,
        data: {
          adminDeptTree: adminDeptTree
        }
      }
    }
  },
  {
    url: '/systemUser/check',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: check
      }
    }
  },
  {
    url: '/systemUser/edit',
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: editData
      }
    }
  }
]
