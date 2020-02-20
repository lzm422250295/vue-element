<template>
  <el-dialog
    :visible.sync="isShow"
    :close-on-click-modal="false"
    :show-close="false"
    :append-to-body="true"
    :close-on-press-escape="false"
    title="修改密码"
    class="cagePs"
    width="400px"
  >
    <el-form ref="passWordForm" :model="form" :rules="rules">
      <el-form-item label="旧密码" prop="passwd">
        <el-input v-model="form.passwd" type="password" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="sPasswd">
        <el-input v-model="form.sPasswd" type="password" placeholder="请输入新密码" />
        <PsGrade v-if="form.sPasswd!==''&&form.sPasswd!==null&&form.sPasswd!==undefined" :val="form.sPasswd" class="grade" />
      </el-form-item>
      <el-form-item label="确认密码" prop="sPasswd2">
        <el-input v-model="form.sPasswd2" type="password" placeholder="请重复一次新密码" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关 闭</el-button>
      <el-button type="primary" @click="submitForm('passWordForm')">确认修改</el-button>
    </div>
  </el-dialog>
</template>
<script>
// import { updatePwsswd } from '@/api/system/userMsg/changePassword'
import PsGrade from '@/components/PsGrade'
export default {
  name: 'ChangePassword',
  components: {
    PsGrade
  },
  props: {
    isShow: {
      type: Boolean,
      default() {
      }
    }
  },
  data() {
    return {
      form: {
        passwd: '',
        sPasswd: '',
        sPasswd2: ''
      },
      rules: {
        passwd: [
          { required: true, message: '请先填写旧密码', trigger: 'blur' }
        ],
        sPasswd: [
          { required: true, message: '请先填写新密码', trigger: 'change' },
          { validator: this.validatePass, trigger: 'blur' }
        ],
        sPasswd2: [
          { required: true, message: '请再次填写新密码', trigger: 'change' },
          { validator: this.validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.form = {}
      this.$emit('close')
      this.$nextTick(() => {
        this.$refs.passWordForm.clearValidate()
      })
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value === this.form.passwd) {
        callback(new Error('新密码不能与旧密码相同'))
      } else {
        if (this.form.sPasswd2 !== '') {
          this.$refs.passWordForm.validateField('sPasswd2')
        }
        callback()
      }
    },
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.sPasswd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    submitForm(formName) {
      if (this.$store.getters.username) {
        this.form.username = this.$store.getters.username
      } else {
        this.form.username = sessionStorage.getItem('username')
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // updatePwsswd(this.form).then(res => {
          //   this.form = {}
          //   this.$emit('close')
          //   this.$refs[formName].resetFields()
          // })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  /deep/.grade{
    right: 5px !important;
    top: 44px !important;
  }
</style>
