// src/mixins/clickMixin.js
export default {
  data() {
    return {
      form: {}, // 查询表单数据
      tableData: [], // 表格数据
      drawerType: '', // 抽屉显示类型
      chooseDetails: [], // 选中栏数据
      drawerShow: false, // 抽屉显示
      drawerLoading: false, // 抽屉加载中样式
      loading: false, // 表格加载样式
      pagination: { // 分页配置
        currentPage: 1, // 当前页
        page: 15, // 每页页数
        all: 100// 总页数
      }
    }
  },
  methods: {
    // 从分页组件获取当前页数请求数据
    getCurrentData(val) {
      this.fetchData(val)
    },
    // 从分页组件获取当前页展示数据条数请求数据
    getSize(val) {
      this.fetchData('', val)
    },
    // 清空查询
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
