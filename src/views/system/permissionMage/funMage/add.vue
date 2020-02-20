<template>
  <el-form
    ref="addForm"
    :rules="rules"
    :model="form"
    size="small"
    style="padding:50px 20px 65px 20px;height:100%;"
    label-width="140px"
  >
    <h3 class="drawer-tit">{{ tit }}</h3>
    <vue-scroll>
      <el-col :span="24">
        <el-form-item label="功能代码" prop="functionCode">
          <el-input v-model="form.functionCode" placeholder="请输入功能代码" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="功能名称" prop="functionName">
          <el-input v-model="form.functionName" :maxlength="150" placeholder="请输入功能名称" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="是否需要授权">
          <el-radio v-model="form.isNeedAuth" label="0">无需授权</el-radio>
          <el-radio v-model="form.isNeedAuth" label="1">需要授权</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="是否需要记录日志">
          <el-radio v-model="form.isRecordLog" label="0">无需记录</el-radio>
          <el-radio v-model="form.isRecordLog" label="1">需要记录</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="启用状态">
          <el-radio v-model="form.enableStatus" label="0">停用</el-radio>
          <el-radio v-model="form.enableStatus" label="1">启用</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" :maxlength="200" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-col>
    </vue-scroll>
    <div class="drawer-btns">
      <el-button size="medium" type="primary" @click="submitForm('addForm')">提交</el-button>
      <el-button size="medium" type="primary" plain @click="resetForm('addForm')">清空</el-button>
      <el-button size="medium" @click="close">取消</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'Add',
  props: {
    tit: {
      type: String,
      default() {
        return
      }
    },
    close: {
      type: Function,
      default() {
        return
      }
    }
  },
  data() {
    return {
      form: {
        functionCode: '',
        functionName: '',
        isNeedAuth: '',
        isRecordLog: '',
        enableStatus: '',
        remark: ''
      },
      rules: {
        functionCode: [
          { required: true, message: '请先输入功能代码', trigger: 'blur' },
          { max: 9, message: '长度须低于9个字符串' }

        ],
        functionName: [
          { required: true, message: '请先输入功能名称', trigger: 'change' }
        ],
        parentCode: [
          { required: true, message: '请先输入上级功能代码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 监听--多选弹框树型的默认值变化与弹框隐藏事件--获取选中ID
    popoverHide(checkedIds) {
      this.form.dataRightDept = String(checkedIds)
    },
    // 提交表单数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('success', this.form)
        } else {
          return false
        }
      })
    },
    // 清空表单数据
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
 .el-row {
    .el-col {
      margin-bottom: 5px;
    }
 }
</style>
