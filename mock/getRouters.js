import Mock from 'mockjs'

export default [
  {
    url: '/user/router',
    type: 'get',
    response: config => {
      const items = Mock.mock([{
        'path': '/',
        'name': '',
        'component': 'Layout',
        'redirect': '/EchartDemo',
        'title': '',
        'icon': '',
        'hidden': '',
        'children': [{
          'path': '/EchartDemo',
          'name': 'EchartDemo',
          'component': 'EchartDemo',
          'redirect': '',
          'affix': true,
          'title': '首页',
          'icon': 'dashboard',
          'hidden': '',
          'children': null
        }]
      }, {
        'path': '/transfer',
        'name': '',
        'component': 'Layout',
        'redirect': '',
        'title': '',
        'icon': '',
        'hidden': '',
        'children': [{
          'path': '/Transfer',
          'name': 'Transfer',
          'component': 'Transfer',
          'redirect': '',
          'title': '穿梭框',
          'icon': 'dashboard',
          'hidden': '',
          'children': null
        }]
      }, {
        'path': '/bigData',
        'name': '',
        'component': 'Layout',
        'redirect': '',
        'title': '',
        'icon': '',
        'hidden': '',
        'children': [{
          'path': '/BigData',
          'name': 'BigData',
          'component': 'BigData',
          'redirect': '',
          'title': '大数据',
          'icon': 'dashboard',
          'hidden': '',
          'children': null
        }]
      }, {
        'path': '/richText',
        'name': '',
        'component': 'Layout',
        'redirect': '',
        'title': '',
        'icon': '',
        'hidden': '',
        'children': [{
          'path': '/RichText',
          'name': 'RichText',
          'component': 'RichText',
          'redirect': '',
          'title': '富文本',
          'icon': 'dashboard',
          'hidden': '',
          'children': null
        }]
      }, {
        'path': '/table',
        'name': '',
        'component': 'Layout',
        'redirect': '',
        'title': '',
        'icon': '',
        'hidden': '',
        'children': [{
          'path': '/tableDemo',
          'name': 'TableDemo',
          'component': 'TableDemo',
          'redirect': '',
          'title': '表格',
          'icon': 'dashboard',
          'hidden': '',
          'children': null
        }]
      }, {
        'path': '/tree',
        'name': '',
        'component': 'Layout',
        'redirect': '',
        'title': '',
        'icon': '',
        'hidden': '',
        'children': [{
          'path': '/processTree',
          'name': 'ProcessTree',
          'component': 'ProcessTree',
          'redirect': '',
          'title': '树形数据展示',
          'icon': 'dashboard',
          'hidden': '',
          'children': null
        }]
      }, {
        'path': '/drawer',
        'name': '',
        'component': 'Layout',
        'redirect': '',
        'title': '',
        'icon': '',
        'hidden': '',
        'children': [{
          'path': '/drawerDemo',
          'name': 'DrawerDemo',
          'component': 'DrawerDemo',
          'redirect': '',
          'title': '抽屉',
          'icon': 'dashboard',
          'hidden': '',
          'children': null
        }]
      }, {
        'path': '/someControls',
        'name': 'someControls',
        'component': 'Layout',
        'redirect': '/ChooseTimeDemo',
        'title': '小控件',
        'icon': 'dashboard',
        'hidden': '',
        'children': [{
          'path': '/ChooseTimeDemo',
          'name': 'ChooseTimeDemo',
          'component': 'ChooseTimeDemo',
          'redirect': '',
          'title': '时间选择',
          'icon': '',
          'hidden': '',
          'children': null
        }, {
          'path': '/TextCarousel',
          'name': 'TextCarousel',
          'component': 'TextCarousel',
          'redirect': '',
          'title': '滚动列表',
          'icon': '',
          'hidden': '',
          'children': null
        }, {
          'path': '/UploadDemo',
          'name': 'UploadDemo',
          'component': 'UploadDemo',
          'redirect': '',
          'title': '上传与导出',
          'icon': '',
          'hidden': '',
          'children': null
        }, {
          'path': '/PsGradeDemo',
          'name': 'PsGradeDemo',
          'component': 'PsGradeDemo',
          'redirect': '',
          'title': '输入强度',
          'icon': '',
          'hidden': '',
          'children': null
        }, {
          'path': '/TreeSelect',
          'name': 'TreeSelect',
          'component': 'TreeSelect',
          'redirect': '',
          'title': '树型下拉-多选',
          'icon': '',
          'hidden': '',
          'children': null
        }]
      },
      {
        'path': '/system',
        'name': 'system',
        'component': 'Layout',
        'title': '系统设置',
        'icon': 'dashboard',
        'hidden': '',
        'children': [{
          'path': '/MsgMage',
          'name': 'MsgMage',
          'component': 'Second',
          'redirect': '',
          'title': '信息管理',
          'icon': '',
          'hidden': '',
          'children': [
            {
              'path': '/MyMsg',
              'name': 'MyMsg',
              'component': 'MyMsg',
              'redirect': '',
              'title': '个人信息',
              'icon': '',
              'hidden': '',
              'children': null
            },
            {
              'path': '/SystemUser',
              'name': 'SystemUser',
              'component': 'SystemUser',
              'redirect': '',
              'title': '系统用户管理',
              'icon': '',
              'hidden': '',
              'children': null
            },
            {
              'path': '/CompUser',
              'name': 'CompUser',
              'component': 'CompUser',
              'redirect': '',
              'title': '企业用户管理',
              'icon': '',
              'hidden': '',
              'children': null
            },
            {
              'path': '/DepartmentMage',
              'name': 'DepartmentMage',
              'component': 'DepartmentMage',
              'redirect': '',
              'title': '管辖部门管理',
              'icon': '',
              'hidden': '',
              'children': null
            }]
        },
        {
          'path': '/PerMage',
          'name': 'PerMage',
          'component': 'Second',
          'redirect': '',
          'title': '权限管理',
          'icon': '',
          'hidden': '',
          'children': [
            {
              'path': '/RoleMage',
              'name': 'RoleMage',
              'component': 'RoleMage',
              'redirect': '',
              'title': '角色信息',
              'icon': '',
              'hidden': '',
              'children': null
            },
            {
              'path': '/RolePerMage',
              'name': 'RolePerMage',
              'component': 'RolePerMage',
              'redirect': '',
              'title': '角色权限',
              'icon': '',
              'hidden': '',
              'children': null
            },
            {
              'path': '/FunMage',
              'name': 'FunMage',
              'component': 'FunMage',
              'redirect': '',
              'title': '功能管理',
              'icon': '',
              'hidden': '',
              'children': null
            }
          ]
        },
        {
          'path': '/SystemData',
          'name': 'SystemData',
          'component': 'Second',
          'redirect': '',
          'title': '系统管理',
          'icon': '',
          'hidden': '',
          'children': [
            {
              'path': '/MenuCifg',
              'name': 'MenuCifg',
              'component': 'MenuCifg',
              'redirect': '',
              'title': '菜单管理',
              'icon': '',
              'hidden': '',
              'children': null
            }
          ]
        }]

      }]
      )
      return {
        code: 200,
        data: items
      }
    }
  }
]

