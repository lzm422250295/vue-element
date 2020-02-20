<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">系 统 标 题</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <transition name="fade">
        <el-form-item v-if="isThird" class="logoCode" prop="captcha">
          <el-col :span="10">
            <el-input v-model="loginForm.captcha" name="captcha" type="text" auto-complete="on" placeholder="请输入验证码" />
          </el-col>
          <el-col :span="14">
            <el-image
              :src="`data:image/jpeg;base64,${imgCode}`"
              class="code-box"
            >
              <div slot="error" class="image-load">
                加载中<span class="dot">...</span><i class="el-icon-loading" />
              </div>
            </el-image>
          </el-col>
        </el-form-item>
      </transition>
      <el-form-item>
        <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getImgCode } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      imgCode: '',
      logoNum: 0, // 登陆错误次数
      loginForm: {
        username: 'admin',
        password: '123',
        captcha: '',
        hasImg: false
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  computed: {
    isThird: function() {
      if (this.logoNum >= 3) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    logoNum: function(val) { // 监听登陆错误次数
      if (val >= 3) {
        this.loginForm.hasImg = true
        this.getCode()
      }
    }
  },
  methods: {
    async getCode() {
      const res = await getImgCode()
      this.imgCode = res.data.img
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            this.logoNum++
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .logoCode{
    .el-form-item__error{
      top:75% !important;
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#eee;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: linear-gradient(20deg,#2da1e4, #00428a);
  // background: url('../../assets/image/loginBg.jpg') no-repeat;
  background-size:100% 100%;
  background-color: $bg;
  .code-box{
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  .el-button{
    font-size: 16px;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 180px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 28px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
    text-shadow: 1px 1px 6px rgba(0,0,0,.5)
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginBtn{
    background: linear-gradient(#fff, #cfe9ff);
    font-weight: bold;
    font-size: 17px;
    color: #0075d0;
    transition: all .2s;
    &:hover{
      filter:brightness(1.06)
    }
  }
  .logoCode{
    border: 0;
    background-color: transparent;
    height: 47px !important;
    .el-input{
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      background: rgba(0, 0, 0, 0.1) !important;
      border-radius: 5px !important;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
