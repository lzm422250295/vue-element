<template>
  <el-form
    ref="entReviseForm"
    :rules="rules"
    :model="reviseData"
    size="mini"
    style="padding:20px;height:100%;"
    label-width="140px"
  >
    <vue-scroll>
      <el-row :gutter="50">
        <el-col :span="11">
          <el-form-item label="企业编码" prop="compCode">
            <el-input v-model="reviseData.compCode" :maxlength="50" disabled="disabled" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="企业名称" prop="compName">
            <el-input v-model="reviseData.compName" :maxlength="200" disabled="disabled" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="姓名" prop="truename">
            <el-input v-model="reviseData.truename" :maxlength="30" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="电话号码" prop="telephone">
            <el-input v-model="reviseData.telephone" placeholder="请输入电话号码" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="手机号码" prop="mphone">
            <el-input v-model="reviseData.mphone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="许可证号" prop="issueCertCode">
            <el-input v-model="reviseData.issueCertCode" :maxlength="50" placeholder="请输入许可证号" />
          </el-form-item>
        </el-col>
      </el-row>
    </vue-scroll>
    <div class="drawer-btns">
      <el-button size="medium" type="primary" @click="submitForm('entReviseForm')">保存</el-button>
      <el-button size="medium" type="primary" plain @click="resetForm('entReviseForm')">重置</el-button>
      <el-button size="medium" @click="close()">关闭</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'Revise',
  props: {
    tit: {
      type: String,
      default() {
        return
      }
    },
    reviseData: {
      type: Object,
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
  methods: {
    // 保存修改
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('success', this.reviseData)
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
 .el-row{
    .el-col{
      margin-bottom: 5px;
    }
 }
</style>
