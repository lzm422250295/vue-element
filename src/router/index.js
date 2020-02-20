import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    affix
    noCache: false
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/demo',
  //   children: [{
  //     path: 'demo',
  //     name: 'demo',
  //     component: () => import('@/views/demo/index'),
  //     meta: { title: '菜单', icon: 'dashboard', affix: true }
  //   }]
  // },
  // {
  //   component: Layout,
  //   meta: {
  //     icon: 'dashboard',
  //     title: '系统管理'
  //   },
  //   name: 'XTGL',
  //   path: '/system',
  //   redirect: '/notice',
  //   children: [
  //     {
  //       component: () => import('@/views/nested/menu1/index'),
  //       meta: { title: '通知公告管理' },
  //       name: 'TZGG',
  //       path: '/notice',
  //       children: [
  //         {
  //           component: () => import('@/views/nested/menu1/menu1-1/index'),
  //           meta: { title: '111', affix: true },
  //           name: '111',
  //           path: '/111'
  //         },
  //         {
  //           component: () => import('@/views/nested/menu1/menu1-2/index'),
  //           meta: { title: '222', affix: true },
  //           name: '222',
  //           path: '/222'
  //         },
  //         {
  //           component: () => import('@/views/nested/menu1/menu1-3/index'),
  //           meta: { title: '333' },
  //           name: '333',
  //           path: '/333'
  //         }
  //       ]
  //     },
  //     {
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '法律法规管理' },
  //       name: 'FLFG',
  //       path: '/laws'
  //     }
  //   ]
  // },
  // {
  //   component: Layout,
  //   meta: {
  //     icon: 'dashboard',
  //     title: '系统管理'
  //   },
  //   name: 'XTGL',
  //   path: '/system',
  //   redirect: '/notice',
  //   children: [
  //     {
  //       component: () => import('@/views/system/notice/index'),
  //       meta: { title: '通知公告管理' },
  //       name: 'TZGG',
  //       path: '/notice'
  //     },
  //     {
  //       component: () => import('@/views/system/notice/laws/index'),
  //       meta: { title: '法律法规管理' },
  //       name: 'FLFG',
  //       path: '/laws'
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
