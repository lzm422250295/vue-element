export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  Second: () => import('@/layout/second'),

  // 演示
  BigData: () => import('@/views/bigData/index'),
  EchartDemo: () => import('@/views/chart/index'),
  DrawerDemo: () => import('@/views/drawer/index'),
  RichText: () => import('@/views/RichText/index'),
  TableDemo: () => import('@/views/tableDemo/index'),
  ProcessTree: () => import('@/views/ProcessTree/index'),
  Transfer: () => import('@/views/transfer/index'),
  TextCarousel: () => import('@/views/someControls/TextCarousel/index'),
  ChooseTimeDemo: () => import('@/views/someControls/chooseTime/index'),
  PsGradeDemo: () => import('@/views/someControls/psGrade/index'),
  TreeSelect: () => import('@/views/someControls/treeSelect/index'),
  UploadDemo: () => import('@/views/someControls/upload/index'),

  // 系统
  SystemUser: () => import('@/views/system/msgMage/systemUser/index'),
  MyMsg: () => import('@/views/system/msgMage/myMsg/index'),
  CompUser: () => import('@/views/system/msgMage/compUser/index'),
  DepartmentMage: () => import('@/views/system/msgMage/departmentMage/index'),
  FunMage: () => import('@/views/system/permissionMage/funMage/index'),
  RolePerMage: () => import('@/views/system/permissionMage/rolePerMage/index'),
  RoleMage: () => import('@/views/system/permissionMage/roleMage/index'),
  MenuCifg: () => import('@/views/system/systemMage/menuCifg/index')
}
