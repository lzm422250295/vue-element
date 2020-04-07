<template>
  <div
    :style="`height:${height}px;`"
    class="wrap"
    @mouseover="onBox"
    @mouseout="outBox"
  >
    <div
      id="box"
      :style="`animation:licenceText ${time}s 0s infinite linear ${go};transform: translateY(0);`"
      class="col-w"
    >

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
  name: 'AssText',
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
        return 14
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
      time: '',
      go: 'paused',
      isMove: ''
    }
  },
  // 更新的时候运动
  mounted() {
    txt.height = 40 * this.list.length
    txt.node = document.getElementById('box')
    if (this.height >= txt.height) {
      this.isMove = false
      return
    }
    txt.addCSS(`@keyframes licenceText {  from { transform: translateY(0); }  to{ transform: translateY(${-txt.height}px);}}`)
    this.isMove = true
    this.time = txt.height / this.height * this.speed
    this.go = 'running'
  },
  methods: {
    onBox() {
      this.go = 'paused'
    },
    outBox() {
      if (this.height >= txt.height) {
        return
      }
      this.go = 'running'
    },
    doSomeThing(val) {
      this.$emit('doSomeThing', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  overflow: hidden;
  .tit{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color:#288cff;
  }
}
#box {
  padding: 0 15px;
  &>div{
    padding-top:3px;
    height: 40px;
    transition: all .3s;
    position: relative;
    border-bottom:1px dashed rgba(255,255,255,.3);
    p{
      height: 30px;
      line-height:30px;
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      img{
        float:left;
        margin-top: 6px;
        width:30px;
      }
      em{
        font-size: 12px;
        font-style: normal;
        color: #c2cbdc;
      }
    }
    .el-button{
      padding: 6px 14px;
      float: right;
      margin: 3px 0 0 9px;
      color: white;
      transition:all .3s;
      &.msg-btn{
        background-color: rgba(224, 12, 70, 0.3);
        border: 1px solid #a22056;
        &:hover{
          background-color: rgba(224, 12, 70, 0.6);
        }
      }
      &.det-btn{
        background-color: rgba(60, 143, 253, 0.3);
        border: 1px solid #2c80bb;
        &:hover{
          background-color: rgba(60, 143, 253, 0.6);
        }
      }
    }
  }
}

</style>
