<template>
  <div>
    <el-row class="common-table">
      <Table
        :other-height="otherHeight"
        :choose-details.sync="chooseDetails"
        :table-data="tableData"
        :content-type="contentType"
        :pagination="pagination"
        :loading="loading"
        @currentChange="getCurrentData"
        @sizeChange="getSize"
      />
    </el-row>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import listFun from '@/mixin/listFun'
import { getList } from '@/api/table'
export default {
  name: 'TableDemo',
  components: {
    Table
  },
  mixins: [listFun],
  data() {
    return {
      otherHeight: 140, // 自适应高度
      contentType: [
        {
          id: 1,
          prop: 'title',
          label: '标题',
          fixed: 'left'
        },
        {
          id: 2,
          prop: 'author',
          label: '名字',
          width: '100'
        },
        {
          id: 3,
          prop: 'display_time',
          label: '时间',
          width: '200',
          align: 'center'
        },
        {
          id: 4,
          prop: 'pageviews',
          label: '数量',
          width: '80'
        }]
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取列表数据
    fetchData(pageNum = 1, pageSize = this.pagination.page) {
      this.loading = true
      const _pageNum = String(pageNum)
      const _pageSize = String(pageSize)
      getList(this.form, _pageNum, _pageSize).then(res => {
        this.tableData = res.data.list
        this.pagination.currentPage = res.data.pageNum
        this.pagination.page = res.data.pageSize
        this.pagination.all = res.data.total
        this.loading = false
      })
    }
  }
}
</script>
