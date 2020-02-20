<template>
  <div :class="color" class="psGrade">
    {{ tet }}
  </div>
</template>
<script>
export default {
  name: 'PsGrade',
  props: {
    val: { // 初始化数据
      type: String,
      default() {
        return
      }
    }
  },
  data() {
    return {
      modes: 0
    }
  },
  computed: {
    tet: function() {
      return this.modes === 0 ? '' : this.modes === 1 ? '弱' : this.modes === 2 ? '中' : this.modes === 3 ? '强' : this.modes === 4 ? '极强' : ''
    },
    color: function() {
      return this.modes === 0 ? '' : this.modes === 1 ? 'red' : this.modes === 2 ? 'yel' : this.modes === 3 ? 'blue' : this.modes === 4 ? 'gre' : ''
    }
  },
  watch: {
    val: function(val) {
      if (val !== undefined) this.checkStrong(val)
    }
  },
  mounted() {
    this.checkStrong(this.val)
  },
  methods: {
    checkStrong(sValue) {
      // 正则表达式验证符合要求的
      this.modes = 0
      if (sValue.length < 1) return this.modes
      if (/\d/.test(sValue)) this.modes++ // 数字
      if (/[a-z]/.test(sValue)) this.modes++ // 小写
      if (/[A-Z]/.test(sValue)) this.modes++ // 大写
      if (/\W/.test(sValue)) this.modes++ // 特殊字符
      return this.modes
    }
  }
}
</script>

<style lang="scss" scoped>
.psGrade{
  color: white;
  height: 32px;
  width: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 4px;
  position: absolute;
  right:-38px;
  top: 0;
  font-weight: 900;
  transition: all .3s;
  &.red{
    background-color: rgb(235, 16, 63)
  }
  &.yel{
    background-color: rgb(240, 170, 18)
  }
  &.blue{
    background-color: rgb(51, 137, 235)
  }
  &.gre{
    background-color: #67c23a
  }
}
</style>

