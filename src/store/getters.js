const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  routes: state => state.user.routes,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes
}
export default getters
