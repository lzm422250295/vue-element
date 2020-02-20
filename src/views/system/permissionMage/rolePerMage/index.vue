<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="14">
        <div :style="allHeight">
          <el-row ref="form" class="white-box" style="padding-bottom:0">
            <el-form
              ref="rpcForm"
              :model="tableForm"
              size="mini"
              label-width="70px"
            >
              <el-col :span="14">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input v-model="tableForm.roleName" placeholder="请输入角色名称" />
                </el-form-item>
              </el-col>
              <el-col :span="10" class="btns-right">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-search"
                  @click="seekData"
                >查询</el-button>
              </el-col>
            </el-form>
          </el-row>
          <el-row class="white-box row-margin">
            <Table
              :multiple="false"
              :other-height="240"
              :table-data="tableData"
              :content-type="contentType"
              :pagination="pagination"
              :loading="loading"
              :current-change="currentChange"
              @cellClick="cellClick"
              @currentChange="getCurrentData"
              @sizeChange="getSize"
            />
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="white-box">
          <vue-scroll>
            <el-tree
              ref="tree"
              :data="treeData"
              :default-expanded-keys="treeExpandedKeys"
              :default-checked-keys="treeCheckedKeys"
              :props="defaultProps"
              :style="allHeight"
              show-checkbox
              node-key="value"
            />
          </vue-scroll>
          <el-button class="save-btn" size="small" type="primary" icon="el-icon-circle-check-outline" @click="submitForm('form')">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getList, init } from '@/api/system/rolePerMage'
import Table from '@/components/Table/index'
export default {
  name: 'RolePermissionsCfg',
  components: {
    Table
  },
  data() {
    return {
      allHeight: '',
      tableForm: { roleName: '' },
      treeExpandedKeys: [], // tree默认打开节点ids
      treeCheckedKeys: [], // tree默认选中节点ids
      loading: '',
      tableData: [],
      pagination: {
        currentPage: 1,
        page: 12,
        all: 100
      },
      contentType: [{
        id: 1,
        prop: 'roleName',
        label: '角色名'
      }, {
        id: 2,
        prop: 'remark',
        label: '备注'
      }],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取Table数据
    fetchData() {
      this.allHeight = 'height:' + (document.body.clientHeight - 126) + 'px'
      this.otherHeight = this.$refs.form.$el.offsetHeight - 32
      getList().then(res => {
        this.fillTable(res)
      }).then(() => {
        this.loading = false
      })
    },
    // 获取选中栏对象
    currentChange(val) {
      this.chooseDetails = val
    },
    // 查询数据
    seekData() {
      getTableData(this.tableForm.roleName).then(res => {
        this.tableData = res.data.list
      }).then(() => {
        this.loading = false
      })
    },
    // 单元格点击事件
    cellClick(row, column, cell, event) {
      // 获取tree数据
      init(row.id).then(res => {
        this.treeData = res.data.adminDeptTree // 树形数据
        // this.treeExpandedKeys = res.data.openIds // 默认展开节点
        // this.treeCheckedKeys = res.data.roleFunList // 后台返回的id组成的数组
      }).then(() => {

      })
    },
    // 从分页组件获取当前页数请求数据
    getCurrentData(val) {
      this.loading = true
      const pageNum = String(val)
      getTableData('', pageNum).then(res => {
        this.fillTable(res)
      }).then(() => {
        this.loading = false
      })
    },
    // 从分页组件获取当前页展示数据条数请求数据
    getSize(val) {
      this.loading = true
      const pageSize = String(val)
      getTableData('', '', pageSize).then(res => {
        this.fillTable(res)
      }).then(() => {
        this.loading = false
      })
    },
    // 保存
    submitForm() {
      // ids： 树形选中的值 + 半选中状态的父级菜单的值
      const ids = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      save(this.chooseDetails.id, ids).then(res => {
      }).then(() => {

      })
    },

    fillTable(res) { // 填入表格数据方法
      this.tableData = res.data.list
      this.pagination.currentPage = res.data.pageNum
      this.pagination.page = res.data.pageSize
      this.pagination.all = res.data.total
    }

  }
}
</script>
<style>
.row-margin{
margin-top:10px;
}
.save-btn{
 position: absolute;
 right: 30px;
 top: 20px;
}
</style>
