<template>
  <div>
    <!-- 抽屉弹框(查看、修改、添加) -->
    <Drawer :is-show.sync="drawerShow" :width="900" :loading="drawerLoading">
      <Details v-if="drawerType === 'details'" :details="details" :close="closeDrawer" />
      <Add v-else-if="drawerType === 'add'" :close="closeDrawer" @success="submit" />
      <Edit v-else-if="drawerType === 'revise'" :revise-data="reviseData" :close="closeDrawer" @success="submit" />
    </Drawer>
    <el-form ref="form" :model="form" size="mini" label-width="80px" class="white-box">
      <el-row>
        <el-col :span="6">
          <el-form-item label="名称/编号" prop="codeAndName">
            <el-input v-model="form.codeAndName" placeholder="请输入名称或编号" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名" prop="truename">
            <el-input v-model="form.truename" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机/电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机/电话" />
          </el-form-item>
        </el-col>
        <el-col :span="6" class="btns-right">
          <el-button size="small" type="primary" icon="el-icon-search" @click="getTableData()">查询</el-button>
          <el-button size="small" type="primary" plain icon="el-icon-refresh" @click="resetForm('form')">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="white-box">
      <el-button size="small" type="primary" icon="el-icon-view" @click="check">查看</el-button>
      <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
      <el-button size="small" type="primary" icon="el-icon-edit" @click="edit">修改</el-button>
      <el-button size="small" type="warning" icon="el-icon-sold-out" @click="afreshPassword">重设密码</el-button>
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
import Details from './components/details'
import Add from './components/add'
import Edit from './components/edit'
import Drawer from '@/components/Drawer/index'
import Table from '@/components/Table/index'
// import { getEnterpriseUserMsg, getCheck, updateUser, addUser, afreshPassword } from '@/api/system/userMsg/enterpriseUserMsg'
import { getSysUser, getCheck, edit } from '@/api/system/compUser'
// import Perm from '@/views/System/btnPermission'
import listFun from '@/mixin/listFun'
export default {
  name: 'EnterpriseUserMsg',
  components: {
    Details,
    Add,
    Edit,
    Drawer,
    Table
  },
  mixins: [listFun],
  data() {
    return {
      // Perm: Perm.userMsg,
      otherHeight: 290,
      dialogFormVisible: false,
      reviseData: {},
      details: {},
      contentType: [{
        id: 1,
        prop: 'compCode',
        label: '企业编号',
        width: '150'
      }, {
        id: 2,
        prop: 'compName',
        label: '企业名称',
        width: '200'
      }, {
        id: 3,
        prop: 'issueCertCode',
        label: '许可证号'
      }, {
        id: 4,
        prop: 'truename',
        label: '姓名'
      }, {
        id: 5,
        prop: 'userRole',
        label: '用户角色'
      }, {
        id: 7,
        prop: 'mphone',
        label: '手机号码'
      }, {
        id: 9,
        prop: 'lastLogonTime',
        label: '最后登录时间',
        width: '180'
      }],
      form: {
        codeAndName: '',
        truename: '',
        phone: ''
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData(pageNum = '', pageSize = this.pagination.page) {
      this.loading = true
      const _pageNum = String(pageNum)
      const _pageSize = String(pageSize)
      getSysUser(this.form, _pageNum, _pageSize).then(res => {
        this.tableData = res.data.list
        this.pagination.currentPage = res.data.pageNum
        this.pagination.page = res.data.pageSize
        this.pagination.all = res.data.total
      }).then(() => {
        this.loading = false
      })
    },
    // 关闭详情抽屉
    closeDrawer() {
      if (this.drawerType === 'details') {
        this.drawerShow = false
        return
      } else {
        this.$confirm('是否关闭', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.drawerShow = false
        }).catch(() => {
        })
      }
    },
    // 添加
    add() {
      this.drawerShow = true
      this.drawerType = 'add'
    },
    // 查看
    check() {
      if (this.chooseDetails.length < 1) {
        this.$message({
          message: '请选择查看的数据',
          type: 'warning'
        })
      } else if (this.chooseDetails.length === 1) {
        this.drawerShow = true
        this.drawerType = 'details'
        const Id = this.chooseDetails[0].id
        this.drawerLoading = true
        getCheck(Id).then(res => {
          this.details = res.data
        }).then(() => {
          this.drawerLoading = false
        }).catch(() => {
          this.drawerLoading = false
        })
      } else {
        this.$message({
          message: '只能选择一条查看',
          type: 'warning'
        })
      }
    },
    // 修改
    edit() {
      if (this.chooseDetails.length < 1) {
        this.$message({
          message: '请选择修改的数据',
          type: 'warning'
        })
      } else if (this.chooseDetails.length === 1) {
        this.drawerShow = true
        this.drawerType = 'revise'
        // this.reviseData = this.chooseDetails[0]
        const Id = this.chooseDetails[0].id
        getCheck(Id).then(res => {
          this.reviseData = res.data
        }).then(() => {
          this.drawerLoading = false
        })
        this.reviseData = this.chooseDetails[0]
      } else {
        this.$message({
          message: '只能选择一条修改',
          type: 'warning'
        })
      }
    },
    // 重设密码
    afreshPassword() {
      if (this.chooseDetails.length > 0) {
        this.$confirm('此操作将要重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = []
          this.chooseDetails.forEach(element => {
            ids.push(element.id)
          })
          afreshPassword(ids)
            .then((res) => {
              this.drawerShow = false
              this.getTableData() // 重新加载数据
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消密码重置'
          })
        })
      } else {
        this.$message({
          message: '请选择要重置密码的数据',
          type: 'warning'
        })
      }
    },
    // 添加的提交按钮点击事件
    submit(val) {
      if (this.drawerType === 'revise') { // 提交修改
        updateUser(val).then((res) => {
          this.drawerShow = false
          this.getTableData() // 重新加载数据
          this.loading = false
        }).catch((res) => {
          this.loading = false
        })
      } else if (this.drawerType === 'add') { // 提交新增
        addUser(val).then((res) => {
          this.drawerShow = false
          this.getTableData() // 重新加载数据
          this.loading = false
        }).catch((res) => {
          this.loading = false
        })
      }
    }
  }
}
</script>

