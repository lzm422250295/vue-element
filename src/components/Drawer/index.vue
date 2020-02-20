<template>
  <transition v-if="isShow" name="slide-fade">
    <div :style="`z-index:${2000+num}`" class="drawer-box">
      <transition v-if="isShow" name="fade">
        <div class="mask" @click="close" />
      </transition>
      <div v-loading="loading" :style="`width:${ width }px`" class="layer">
        <div class="drawer-tit f16 fb">{{ tit }}</div>
        <slot />
        <div class="drawer-btns">
          <slot name="btns" />
          <el-button size="medium" type="danger" class="fr" @click="close">关闭</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    tit: {
      type: String,
      default() {
        return '请填写标题'
      }
    },
    loading: {// 加载样式
      type: Boolean,
      default() {
        return
      }
    },
    isShow: {// 是否显示
      type: Boolean,
      default() {
        return
      }
    },
    needConfirm: {// 是否显示
      type: Boolean,
      default() {
        return false
      }
    },
    width: {// 宽度
      type: Number,
      default() {
        return 750
      }
    },
    num: {// 层次等级
      type: Number,
      default() {
        return 0
      }
    },
    afterClose: { // 蒙版关闭
      type: Function,
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
    close() {
      if (this.needConfirm) {
        this.$confirm('是否关闭', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('update:isShow', false)
          if (this.afterClose) this.afterClose()
        }).catch(() => {
        })
      } else {
        this.$emit('update:isShow', false)
        if (this.afterClose) this.afterClose()
      }
    }
  }
}
</script>

