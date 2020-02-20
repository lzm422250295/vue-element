<template>
  <el-form
    ref="form"
    :rules="rules"
    :model="data"
    size="small"
    style="padding:20px;height:100%;"
    label-width="140px"
  >
    <vue-scroll>
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="data.username" :maxlength="30" disabled="disabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="data.password" :maxlength="30" disabled="disabled" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="data.name" :maxlength="30" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管辖部门" prop="departIds">
            <el-cascader
              v-model="data.departIds"
              :options="init.orgOptions"
              :show-all-levels="false"
              :props="{ expandTrigger: 'hover', checkStrictly: true }"
              placeholder="请选择管辖部门"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio v-for="li in init.sexList" :key="li.value" v-model="data.sex" :label="li.value">{{ li.label_default }}</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="启用状态" prop="status">
            <el-radio v-model="data.status" label="1">启用</el-radio>
            <el-radio v-model="data.status" label="0">停用</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话号码" prop="mobilePhone">
            <el-input v-model="data.mobilePhone" placeholder="请输入电话号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="telPhone">
            <el-input v-model="data.telPhone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系地址" prop="address">
            <el-input v-model="data.address" :maxlength="200" placeholder="请输入联系地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="E-mail" prop="email">
            <el-input v-model="data.email" :maxlength="200" placeholder="请输入E-mail" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="description">
            <el-input v-model="data.description" :maxlength="200" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </vue-scroll>
    <div class="drawer-btns">
      <el-button size="medium" type="primary" @click="submit('form')">保存</el-button>
      <el-button size="medium" type="primary" plain @click="resetForm('form')">重置</el-button>
    </div>
  </el-form>
</template>
<script>
import rules from '../../../mixin/rules'
export default {
  name: 'Edit',
  mixins: [rules],
  props: {
    data: {
      type: Object,
      default() {
        return
      }
    },
    init: {
      type: Object,
      default() {
        return
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 保存修改
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('success', this.data)
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
