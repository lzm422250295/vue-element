<template>
  <div>

    <!-- 抽屉  -->
    <Drawer :is-show.sync="drawerShow" :width="1000" :tit="drawerType==='Details'?'查看':(drawerType==='Add'?'添加':'修改')">
      <!-- 抽屉内容 -->
      <component
        :is="drawerType"
        :data="drawerData"
        :init="init"
        @success="success()"
      />
    </Drawer>

    <el-form ref="form" :model="form" size="mini" label-width="80px" class="white-box" style="padding-bottom:0px;">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="管辖部门" prop="departIds">
            <el-cascader
              v-model="form.departIds"
              :options="init.orgOptions"
              :show-all-levels="false"
              placeholder="请选择管辖部门"
              clearable
              :props="{ expandTrigger: 'hover' ,checkStrictly: true }"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机/电话" prop="telMobPhone">
            <el-input v-model="form.telMobPhone" placeholder="请输入手机/电话" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="启用状态" prop="enableStatus">
            <el-select v-model="form.enableStatus" clearable placeholder="请选择状态">
              <el-option label="启用" :value="1" />
              <el-option label="停用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8" class="btns-right">
          <el-button size="small" type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button size="small" type="primary" plain icon="el-icon-refresh" @click="resetForm('form')">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="common-table white-box">
      <div style="margin-top:10px;">
        <el-button size="small" type="primary" icon="el-icon-view" @click="check">查看</el-button>
        <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="add">添加</el-button>
        <el-button size="small" type="primary" icon="el-icon-edit" @click="edit">修改</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteUser">删除</el-button>
        <el-button size="small" icon="el-icon-sold-out" @click="afreshPassword">重设密码</el-button>
        <el-button size="small" icon="el-icon-goods" @click="logUnlock">登录解锁</el-button>
      </div>
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
import { getSysUser, init, getCheck, edit } from '@/api/system/systemUser'
import listFun from '@/mixin/listFun'
export default {
  name: 'SystemUserMsg',
  components: {
    Details,
    Edit,
    Drawer,
    Table,
    Add
  },
  mixins: [listFun],
  data() {
    return {
      drawerData: {},
      init: {
        orgOptions: []
      },
      otherHeight: 300,
      contentType: [{
        id: 1,
        prop: 'username',
        label: '用户名'
      }, {
        id: 2,
        prop: 'name',
        label: '姓名'
      }, {
        id: 3,
        prop: 'sexStr',
        label: '性别',
        width: '50'
      }, {
        id: 4,
        prop: 'orgName',
        label: '管辖部门',
        width: '160'
      }, {
        id: 5,
        prop: 'phone',
        label: '手机'
      }, {
        id: 7,
        prop: 'email',
        label: 'Email',
        width: '140'
      }, {
        id: 8,
        prop: 'status',
        label: '状态',
        width: '50'
      }, {
        id: 9,
        prop: 'lastLogonTime',
        label: '最后登录时间',
        width: '150'
      }, {
        id: 10,
        prop: 'userLockTime',
        label: '登录锁定时间',
        width: '150'
      }],
      form: {
        username: '',
        name: '',
        departIds: [],
        departId: '',
        telMobPhone: ''
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 获取数据
    initData() {
      // 获取下拉数据
      init().then(res => {
        this.init.orgOptions = res.data.adminDeptTree
      }).then(() => {
        this.fetchData()
      })
    },
    fetchData(pageNum = '', pageSize = this.pagination.page) {
      this.loading = true
      const _pageNum = String(pageNum)
      const _pageSize = String(pageSize)
      if (this.form.departIds) {
        this.form.departId = this.form.departIds[this.form.departIds.length - 1]
      }
      getSysUser(this.form, _pageNum, _pageSize).then(res => {
        this.tableData = res.data.list
        this.pagination.currentPage = res.data.pageNum
        this.pagination.page = res.data.pageSize
        this.pagination.all = res.data.total
      }).then(() => {
        this.loading = false
      })
    },
    // 添加
    add() {
      this.drawerShow = true
      this.drawerType = 'Add'
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
        this.drawerType = 'Details'
        const Id = this.chooseDetails[0].id
        this.drawerLoading = true
        getCheck(Id).then(res => {
          this.drawerData = res.data
        }).then(() => {
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
          message: '请选择要修改的数据',
          type: 'warning'
        })
      } else if (this.chooseDetails.length === 1) {
        this.drawerShow = true
        const Id = this.chooseDetails[0].id
        edit(Id).then(res => {
          this.drawerType = 'Edit'
          if (res.data.departId) {
            const departId = String(res.data.departId)
            switch (departId.length) {
              case 4:
                res.data.departIds = [departId]
                break
              case 6:
                res.data.departIds = [departId.slice(0, 4), departId]
                break
              default:
                res.data.departIds = [departId.slice(0, 4), departId.slice(0, 6), departId]
                break
            }
          }
          this.drawerData = res.data
        }).then(() => {
          this.drawerLoading = false
        })
      } else {
        this.$message({
          message: '只能选择一条进行修改',
          type: 'warning'
        })
      }
    },
    // 删除
    deleteUser() {
      if (this.chooseDetails.length > 0) {
        this.$confirm('此操作将永久删除选中的用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = []
          this.chooseDetails.forEach(element => {
            ids.push(element.id)
          })
          deleteUsers(ids)
            .then(() => {
              this.drawerShow = false
              this.fetchData() // 重新加载数据
            })
        }).catch(() => false)
      } else {
        this.$message({
          message: '请选择需要删除的数据',
          type: 'warning'
        })
      }
    },
    // 添加的提交按钮点击事件
    success(val) {
      if (this.drawerType === 'Edit') { // 提交修改
        debugger
        // updateUser(val).then(() => {
        //   this.drawerShow = false
        //   this.fetchData() // 重新加载数据
        //   this.loading = false
        // }).catch(() => {
        //   this.loading = false
        // })
      } else if (this.drawerType === 'Add') { // 提交新增
        debugger
        // addUser(val).then(() => {
        //   this.drawerShow = false
        //   this.fetchData() // 重新加载数据
        //   this.loading = false
        // }).catch(() => {
        //   this.loading = false
        // })
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
            .then(() => {
              this.drawerShow = false
              this.fetchData() // 重新加载数据
            })
        }).catch(() => false)
      } else {
        this.$message({
          message: '请选择将要重置密码的数据',
          type: 'warning'
        })
      }
    },
    // 登录解锁
    logUnlock() {
      if (this.chooseDetails.length > 0) {
        this.$confirm('您确定要对这些用户解除登录锁定么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = []
          this.chooseDetails.forEach(element => {
            ids.push(element.id)
          })
          logUnlock(ids)
            .then(() => {
              this.drawerShow = false
              this.fetchData() // 重新加载数据
            })
        }).catch(() => false)
      } else {
        this.$message({
          message: '请选择需要解除登录锁定的数据',
          type: 'warning'
        })
      }
    }
  }
}
</script>

