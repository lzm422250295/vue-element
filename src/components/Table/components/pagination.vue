<template>
  <div>
    <div class="block">
      <el-pagination
        :current-page="pagination.currentPage"
        :page-size="pagination.page"
        :total="pagination.all"
        :page-sizes="[10, 15, 20, 30, 40, 50]"
        background
        small
        layout="jumper, prev, pager, next,sizes,total "
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pagination: {
      type: Object,
      default() {
        return
      }
    }
  },
  // 将当前页数传给父组件
  methods: {
    handleCurrentChange(val) {
      this.$emit('currentChange', val)
    },
    handleSizeChange(val) {
      this.$emit('sizeChange', val)
    }
  }
}
</script>
<style lang="scss">
</style>

