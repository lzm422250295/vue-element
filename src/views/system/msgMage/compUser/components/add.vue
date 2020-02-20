<template>
  <div>
    <!-- dialog弹窗，子页面comp信息 -->
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" :lock-scroll="false" title="企业信息查询" width="950px">
      <el-form ref="dialogForm" :model="dialogForm" size="mini" label-width="80px" class="table-layer">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="企业编码" prop="compCode">
              <el-input v-model="dialogForm.compCode" placeholder="请输入企业编码" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="企业名称" prop="compName">
              <el-input v-model="dialogForm.compName" placeholder="请输入企业名称" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button size="mini" type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
            <el-button size="mini" type="primary" plain icon="el-icon-refresh" @click="resetForm('dialogForm')">清空</el-button>
          </el-col>
          <el-col :span="5" class="btns-right">
            <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="setComp">确 定</el-button>
          </el-col>
        </el-row>
      </el-form>
      <Table
        :multiple="false"
        :other-height="400"
        :table-data="tableData"
        :content-type="contentType"
        :pagination="pagination"
        :loading="loading"
        :current-change="currentChange"
        @currentChange="getCurrentData"
        @sizeChange="getSize"
      />
    </el-dialog>
    <el-form
      ref="entAddForm"
      :rules="rules"
      :model="addForm"
      size="mini"
      style="padding:20px;height:100%;"
      label-width="140px"
    >
      <h3 class="drawer-tit">添加企业用户信息</h3>
      <vue-scroll>
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="企业编码" prop="compCode" class="readonly">
              <el-input v-model="addForm.compCode" class="input-btn" readonly placeholder="请选择">
                <el-button slot="append" icon="el-icon-search" @click="showCompTable" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="compName" class="readonly">
              <el-input v-model="addForm.compName" :maxlength="200" placeholder="请输入企业名称" readonly="readonly" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="truename">
              <el-input v-model="addForm.truename" :maxlength="30" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="电话号码" prop="telephone">
              <el-input v-model="addForm.telephone" placeholder="请输入电话号码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mphone">
              <el-input v-model="addForm.mphone" placeholder="请输入手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="许可证号" prop="licenseNo">
              <el-input v-model="addForm.licenseNo" :maxlength="50" placeholder="请输入许可证号" />
            </el-form-item>
          </el-col>
        </el-row></vue-scroll>
      <div class="drawer-btns">
        <el-button size="medium" type="primary" @click="submitForm('entAddForm')">提交</el-button>
        <el-button size="medium" type="primary" plain @click="resetForm('entAddForm')">清空</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import Table from '@/components/Table/index'
// import { getSpfCompany } from '@/api/system/userMsg/enterpriseUserMsg'
export default {
  name: 'Add',
  components: {
    Table
  },
  props: {
    close: {
      type: Function,
      default() {
        return
      }
    }
  },
  data() {
    return {
      loading: '',
      dialogFormVisible: false,
      tableData: [],
      chooseDetails: '',
      addForm: {
        compCode: '',
        compName: '',
        truename: '',
        telephone: '',
        mphone: '',
        licenseNo: ''
      },
      dialogForm: {
        compCode: '',
        compName: ''
        // issueCertCode: ''
      },
      contentType: [{
        id: 1,
        prop: 'compCode',
        label: '企业编号'
      }, {
        id: 2,
        prop: 'compName',
        label: '企业名称'
      }, {
        id: 3,
        prop: 'adminDept',
        label: '管辖部门'
      }, {
        id: 4,
        prop: 'creditGrade',
        label: '信用等级',
        width: '100'
      }],
      pagination: {
        currentPage: 1,
        page: 12,
        all: 100
      },
      rules: {
        compCode: [
          { required: true, message: '请先选择企业', trigger: 'blur' }
        ],
        compName: [
          { required: true, message: '请先选择企业', trigger: 'change' }
        ],
        telephone: [
          { pattern: /^(\d{3}-\d{8})$|^(\d{4}-\d{7})$|^(\d{8})$|^(\d{7})$|^(1\d{10})$/, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        mphone: [
          { pattern: /^(1\d{10})$/, message: '请输入正确的号码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData(pageNum = '', pageSize = this.pagination.page) {
      this.loading = true
      // const _pageNum = String(pageNum)
      // const _pageSize = String(pageSize)
      // getSpfCompany(this.dialogForm, _pageNum, _pageSize).then(res => {
      //   this.tableData = res.data.list
      //   this.pagination.currentPage = res.data.pageNum
      //   this.pagination.page = res.data.pageSize
      //   this.pagination.all = res.data.total
      // }).then(() => {
      //   this.loading = false
      // })
    },
    // 获取选中栏数据
    currentChange(val) {
      this.chooseDetails = val
    },
    // 从分页组件获取当前页数请求数据
    getCurrentData(val) {
      this.fetchData(val)
    },
    // 从分页组件获取当前页展示数据条数请求数据
    getSize(val) {
      this.getTableData('', val)
    },
    // 提交表单数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('success', this.addForm)
        } else {
          return false
        }
      })
    },
    // 清空表单数据
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 显示企业table弹窗
    showCompTable() {
      this.dialogFormVisible = true
    },
    // 获取选中comp赋值
    setComp() {
      this.addForm.compCode = this.chooseDetails.compCode
      this.addForm.compName = this.chooseDetails.compName
      this.addForm.licenseNo = this.chooseDetails.licenseNo
      // alert(this.addForm.licenseNo)
      this.$refs['entAddForm'].validate((valid) => { // 重新验证表单。
        this.dialogFormVisible = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-layer{
  .el-form-item{
    margin-bottom: 0
  }
}
/deep/.el-dialog__body{
  padding: 15px 15px 35px ;
}
 .el-row{
    .el-col{
      margin-bottom: 5px;
    }
 }
</style>
