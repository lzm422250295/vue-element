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
    loading: {
      // 加载样式
      type: Boolean,
      default() {
        return
      }
    },
    isShow: {
      // 是否显示
      type: Boolean,
      default() {
        return
      }
    },
    needConfirm: {
      // 是否显示
      type: Boolean,
      default() {
        return false
      }
    },
    width: {
      // 宽度
      type: Number,
      default() {
        return 750
      }
    },
    num: {
      // 层次等级
      type: Number,
      default() {
        return 0
      }
    },
    afterClose: {
      // 蒙版关闭回调
      type: Function,
      default() {
        return
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    close() {
      if (this.needConfirm) {
        this.$confirm('是否关闭', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('update:isShow', false)
            if (this.afterClose) this.afterClose()
          })
          .catch(() => {})
      } else {
        this.$emit('update:isShow', false)
        if (this.afterClose) this.afterClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter {
  transform: translateX(200px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.drawer-box {
  .fileList {
    margin-right: 10px;
    a {
      height: 100%;
      width: 100%;
      display: inline-block;
      color: #47b50a;
    }
  }
  transition: all 0.25s;
  position: fixed;
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
  .mask {
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .__view {
    padding-right: 15px;
  }
  .layer {
    box-shadow: -2px 0 6px rgba($color: #000000, $alpha: 0.1);
    background-color: white;
    position: absolute;
    transition: all 0.2s;
    padding: 60px 20px;
    height: 100%;
    z-index: 1;
    width: 24%;
    right: 0;
    top: 0;
  }
  .details {
    p {
      word-break: break-word;
    }
    img {
      max-width: 100%;
    }
    border-radius: 5px;
    font-size: 14px;
    position: relative;
    padding: 20px 6px 20px 20px;
    .el-divider--horizontal {
      margin: 45px 0 25px 0;
      &:first-child {
        margin-top: 0;
      }
    }
    table {
      border: 1px solid #ced9e8;
      border-top: 0;
      border-left: 0;
      width: 100%;
      td {
        padding: 8px;
        border-left: 1px solid #ced9e8;
        border-top: 1px solid #ced9e8;
        max-width: 300px;
        min-width: 140px;
        word-break: break-word;
      }
      td:nth-child(odd) {
        width: 150px;
        color: #848e9a;
        background-color: #f8fcfd;
      }
    }
    .manageBox {
      margin-top: 40px;
    }
  }
  .drawer-btns {
    padding: 12px 14px;
    height: 60px;
    position: absolute;
    text-align: left;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px #ddd solid;
  }
  .drawer-tit {
    height: 45px;
    line-height: 45px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 20px;
    width: 100%;
    border-bottom: 1px #ddd solid;
    &:before {
      content: "";
      display: inline-block;
      height: 45px;
      width: 7px;
      background-color: #007ed6;
      position: absolute;
      left: 0;
      top: 0px;
    }
  }
  .manageBox {
    /deep/.el-radio__label {
      display: inline-block;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: normal !important;
    }
    .el-step {
      cursor: pointer;
    }
    .left {
      .el-step__head {
        color: #717988;
        border-color: #717988;
      }
      width: 10%;
      display: inline-block;
      .el-step__title {
        color: #717988;
        font-size: 14px;
        font-weight: normal;
      }
      .active .el-step__head {
        color: #fff;
        border-color: #1389fd;
        .el-step__icon {
          background-color: #1389fd;
        }
      }
      .active .el-step__title {
        color: #1389fd;
      }
      .el-step__description.is-wait,
      .el-step__description.is-process,
      .el-step__description.is-finish {
        color: #ff4073;
      }
    }
    .right {
      background-color: #f6fbff;
      border-radius: 5px;
      padding: 12px 16px;
      width: 87%;
      margin-left: 3%;
      float: right;
      & > li {
        list-style-type: none !important;
        position: relative;
        width: 100%;
        margin: 8px 0 15px;
        float: left;
        background-color: #fff;
        border: 1px #ced9e8 solid;
        border-radius: 4px;
        padding: 18px;
        .el-row:first-child {
          margin-bottom: 12px;
        }
      }
    }
  }
  .tinymce-container {
    margin: 15px 0 25px;
  }
}
</style>
