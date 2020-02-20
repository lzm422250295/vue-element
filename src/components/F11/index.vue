<template>
  <span :class="isChangeSize? 'isActive':''" class="changeSize" @click="changeSize">
    <svg-icon :icon-class="isChangeSize?'reduceSize':'addSize'" />
  </span>
</template>

<script>
export default {
  data() {
    return {
      isChangeSize: false
    }
  },
  methods: {
    changeSize: function() {
      this.isChangeSize = !this.isChangeSize
      this.$emit('changeSize', this.isChangeSize)
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style lang="scss" scope>
  .changeSize{
    cursor: pointer;
    background-color: white;
    border-radius: 12px;
    border: 1px solid #2c74c7;
    background: rgba(11, 95, 154, 0.2);
    color: white !important;
    height: 40px;
    width: 40px;
    line-height: 39px;
    z-index: 1002;
    text-align: center;
    padding: 0;
    position: absolute;
    left: 79px;
    top: 106px;
    transition:all .3s;
    &:hover{
      // background: linear-gradient(#5aa7ff, #2d78ce) !important;
      box-shadow: 0px 0px 15px rgb(6, 164, 255);
      border: 1px solid #2064b3;
    }
  }
</style>
