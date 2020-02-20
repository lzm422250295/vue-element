<template>
  <div class="tableBox">
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      :cell-style="padding"
      :height="autoHeight"
      highlight-current-row
      stripe
      style="width: 100%"
      @row-click="choseRow"
      @row-dblclick="dblclick"
      @cell-click="cellClick"
      @selection-change="chooseChange"
      @current-change="currentChange"
    >
      <el-table-column
        v-if="multiple"
        type="selection"
        width="55"
        fixed="left"
      />
      <!-- el-table-column具体参数参考 element-ui  https://element.eleme.cn/#/zh-CN/component/table-->
      <el-table-column
        v-for="item in contentType"
        :key="item.id"
        :show-overflow-tooltip="true"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :fixed="item.fixed"
      >
        <template slot-scope="scope">
          <span>{{ scope.row[String(item.prop)] }}</span>
        </template>
      </el-table-column>

    </el-table>
    <div class="line" />
    <pagination v-if="havePagination" :pagination="pagination" v-on="$listeners" />
  </div>
</template>

<script>
import pagination from './components/pagination'
export default {
  name: 'Table',
  components: {
    pagination
  },
  props: {
    multiple: {// 是否单选
      type: Boolean,
      default() {
        return true
      }
    },
    otherHeight: {// 出表格外的其他元素的高度
      type: Number,
      default() {
        return
      }
    },
    loading: {// 表格加载状态
      type: Boolean,
      default() {
        return true
      }
    },
    havePagination: {// 是否需要分页
      type: Boolean,
      default() {
        return true
      }
    },
    chooseDetails: {// 选择数据
      type: Array,
      default() {
        return
      }
    },
    currentChange: {// 当前选中事件
      type: Function,
      default() {
        return
      }
    },
    pagination: {// 分页数据
      type: Object,
      default() {
        return
      }
    },
    tableData: {// 表格数据
      type: Array,
      default() {
        return
      }
    },
    contentType: {// 表格数据配置
      type: Array,
      default() {
        return
      }
    }
  },

  computed: {
    autoHeight: function() {
      return document.body.clientHeight - this.otherHeight + 'px'
    }
  },
  methods: {
    // 选中数据
    chooseChange(val) {
      this.$emit('update:chooseDetails', val)
    },
    // 单元格点击
    tdClick(row, label) {
      this.$emit('tdClick', row)
    },
    // 行点击
    cellClick(row, column, cell) {
      this.$emit('cellClick', row)
    },
    // 行双击
    dblclick(row, column, event) {
      this.$emit('dblclick', row)
    },
    padding() {
      return 'padding: 12px 0'
    },
    // 行点击事件-选中-取消选中
    choseRow(row) {
      this.$refs.table.clearSelection()
      this.$refs.table.toggleRowSelection(row)
    }
  }

}
</script>
<style lang="scss">
.common-table{
  background-color: white;
  border-radius: 4px;
  padding: 0 12px;
  box-shadow: 1px 1px 4px rgba(10, 116, 191,0.2);
}
.tableBox{
  .clickStyle{
    color: #158fdb;
    cursor: pointer;
    transition:all .3s;
    &:hover{
      text-decoration:underline;
    }
  }
  .clickStyle2{
    color:#158fdb;
    &>span{
      cursor: pointer;
      &:hover{
      text-decoration:underline;
      }
    }
  }
  .tableBadge{
    .el-badge__content.is-fixed{
        transform: translateY(0%) translateX(90%);
    }
  }
  position: relative;
  .el-table th{
    color:#333;
  }
  .line{
    position: absolute;
    top: 38px;
    z-index: 6;
    height: 2px;
    width: 100%;
    background-color: #289def;
    border-radius: 100px;
  }
}
</style>
