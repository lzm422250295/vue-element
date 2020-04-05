<template>
  <div
    :style="`height:${autoHeight}px;`"
    class="wrap"
    @mouseover="onBox"
    @mouseout="outBox"
  >
    <div id="box" class="col-w">
      <div v-for="(li) in list" :key="li.id" @click="doSomeThing(li)">
        <span class="tit">{{ li.data }}</span>
        <span class="fr">{{ li.time }}</span>
      </div>

      <div v-for="(li) in list" :key="'a'+li.id" @click="doSomeThing(li)">
        <span class="tit">{{ li.data }}</span>
        <span class="fr">{{ li.time }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import txt from './txt'
export default {
  props: {
    list: { // 数据
      type: Array,
      default() {
        return
      }
    },
    speed: { // 执行间隔时间
      type: Number,
      default() {
        return 50
      }
    },
    height: { // 自定义高度
      type: Number,
      default() {
        return 300
      }
    }
  },
  // 父组件传入数据， 数组形式 []
  data() {
    return {
      distance: 0, // 距离
      autoHeight: '' // 自适应高度
    }
  },
  // 更新的时候运动
  updated() {
    this.onBox()
    txt.height = document.getElementById('box').clientHeight
    txt.height2 = txt.height / 2
    txt.node = document.getElementById('box')
    // if (this.height >= txt.height) {
    //   return
    // }
    this.autoHeight = this.height >= txt.height2 ? txt.height2 : this.height
    this.move(txt.height, txt.node)
  },
  methods: {
    onBox() {
      clearInterval(txt.fun)
    },
    outBox() {
      // if (this.height >= txt.height) {
      //   return
      // }
      this.move(txt.height, txt.node)
    },
    doSomeThing(val) {
      this.$emit('doSomeThing', val)
    },
    move(height, node) {
      // 设置位移
      txt.fun = setInterval(() => {
        this.distance = this.distance - 1
        // 如果位移超过文字宽度，则回到起点
        if (-this.distance >= height / 2) {
          this.distance = 0
        }
        node.style.transform = 'translateY(' + this.distance + 'px)'
      }, this.speed)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  overflow: hidden;
  .tit{
    color:#28e2ff;
  }
}
#box {
  &>div{
    cursor: pointer;
    height: 35px;
    transition: all .3s;
    position: relative;
    line-height: 35px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding-right:110px;
    border-bottom:1px dashed rgba(255,255,255,.3);
    .result{
      position: absolute;
      right: 0;
      top: 0;
    }
    &:hover{
      background-color: rgba(255,255,255,.15);
      color:#28e2ff;
    }
  }
}

</style>
