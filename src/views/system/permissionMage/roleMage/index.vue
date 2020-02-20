<template>
  <div>
    <el-dialog :visible.sync="dialogFormVisible" :title="tit" :close-on-click-modal="false" width="500px">
      <el-form v-if="dialogFormVisible" ref="dialogForm" :rules="rules" :model="dialogForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="dialogForm.roleName" :maxlength="50" type="text" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item v-if="enableStatusType" label="角色状态" prop="enableStatus">
          <el-radio v-model="dialogForm.enableStatus" label="1">启用</el-radio>
          <el-radio v-model="dialogForm.enableStatus" label="0">停用</el-radio>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dialogForm.remark" :maxlength="200" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitForm('dialogForm')">{{ butText }}</el-button>
        <el-button size="small" type="primary" plain @click="resetForm('dialogForm')">重 置</el-button>
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-form ref="rpmForm" :model="form" label-width="80px" class="white-box" size="mini" style="padding-bottom:0">
      <el-row>
        <el-col :span="6">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="角色状态" prop="enableStatus">
            <el-select v-model="form.enableStatus" clearable placeholder="请选择角色状态">
              <el-option label="启用" value="1" />
              <el-option label="停用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="btns-right">
          <el-button size="small" type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button size="small" type="primary" plain icon="el-icon-refresh" @click="resetForm('rpmForm')">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="white-box">
      <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="showDialog('add')">添加</el-button>
      <el-button size="small" type="primary" icon="el-icon-edit" @click="showDialog('edit')">修改</el-button>
      <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteRose">删除</el-button>
      <Table
        :other-height="275"
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
import { getList } from '@/api/system/roleMage'
// import { getRolePermissionsMsgData, addRoleMsg, reduceRoleMsg, getCheck, changeData } from '@/api/system/rolePermissions/rolePermissionsMsg'
export default {
  name: 'RolePermissionsMsg',
  components: {
    Table
  },
  data() {
    return {
      butText: '',
      tit: '',
      dialogFormVisible: false,
      loading: '',
      roleName: '',
      chooseDetails: '',
      enableStatusType: '',
      pagination: {
        currentPage: 1,
        page: 12,
        all: 100
      },
      value: '',
      contentType: [{
        id: 1,
        prop: 'roleName',
        label: '角色名',
        width: '350'
      }, {
        id: 2,
        prop: 'enableStatus',
        label: '状态',
        width: '70'
      }, {
        id: 3,
        prop: 'remark',
        label: '备注'
      }, {
        id: 4,
        prop: 'createUser',
        label: '创建人',
        width: '90'
      }, {
        id: 5,
        prop: 'createTime',
        label: '创建日期',
        width: '160'
      }, {
        id: 6,
        prop: 'lastModUser',
        label: '最后修改人',
        width: '100'
      }],
      tableData: [],
      form: {
        roleName: '',
        enableStatus: ''
      },
      dialogForm: {
        roleName: '',
        enableStatus: '',
        remark: ''
      },
      rules: { // 表单验证
        roleName: [
          { required: true, message: '请先输入角色名称', trigger: 'blur' }
        ],
        enableStatus: [
          { required: true, message: '请选择角色状态', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData(pageNum1 = 1, pageSize = this.pagination.page) {
      this.loading = true
      const _pageNum = String(pageNum1)
      const _pageSize = String(pageSize)
      getList(this.form, _pageNum, _pageSize).then(res => {
        this.tableData = res.data.list
        this.pagination.currentPage = res.data.pageNum
        this.pagination.page = res.data.pageSize
        this.pagination.all = res.data.total
      }).then(() => {
        this.loading = false
      })
    },

    // 获取选中栏数据
    chooseChange(val) {
      this.chooseDetails = val
    },
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
    },
    // 显示弹窗
    showDialog(buttonType) {
      if (buttonType === 'add') { // 新增
        this.butText = '提 交'
        this.dialogFormVisible = true
        this.dialogForm = {
          roleName: '',
          enableStatus: '',
          remark: ''
        }
        this.tit = '新增角色信息'
        this.enableStatusType = false // 是否显示角色状态
      } else if (buttonType === 'edit') { // 修改
        if (this.chooseDetails.length < 1) {
          this.$message({
            message: '请选择要修改的数据',
            type: 'warning'
          })
        } else if (this.chooseDetails.length === 1) {
          this.enableStatusType = true // 是否显示角色状态
          // this.dialogForm = this.chooseDetails[0]
          this.tit = '修改角色信息'
          this.butText = '保 存'
          const Id = this.chooseDetails[0].id
          getCheck(Id).then(res => {
            this.dialogForm = res.data
          }).then(() => {
            this.dialogFormVisible = true
          })
        } else {
          this.$message({
            message: '只能选择一条修改',
            type: 'warning'
          })
        }
      }
    },
    // 删除角色
    deleteRose() {
      if (this.chooseDetails.length > 0) {
        this.$confirm('此操作将永久删除选中的角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = []
          this.chooseDetails.forEach(el => {
            ids.push(el.id)
          })
          reduceRoleMsg(ids)
            .then(() => {
              this.fetchData() // 重新加载数据
            })
        }).catch(() => {
        })
      } else {
        this.$message({
          message: '请先选择要删除的数据',
          type: 'warning'
        })
      }
    },
    // 添加的提交按钮点击事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.enableStatusType) {
            changeData(this.dialogForm)
              .then((res) => {
                this.$emit('success', this.form)
                this.dialogFormVisible = false
                this.fetchData() // 重新加载数据
              }).catch((res) => {
                this.loading = false
              })
          } else {
            addRoleMsg(this.dialogForm)
              .then((res) => {
                this.dialogFormVisible = false
                this.fetchData() // 重新加载数据
              }).catch(() => {
                this.loading = false
              })
          }
        } else {
          return false
        }
      })
    }
  }

}
</script>
