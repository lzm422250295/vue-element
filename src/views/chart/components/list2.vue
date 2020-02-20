<template>
  <ul>
    <li>
      <strong>1</strong>
      <span class="left fl">闽南版海南鸡套餐</span>
      <span class="rig fr">￥<em>15</em></span>
    </li>
    <li>
      <strong>2</strong>
      <span class="left fl">秘汁可乐小鸡腿套餐</span>
      <span class="rig fr">￥<em>25</em></span>
    </li>
    <li>
      <strong>3</strong>
      <span class="left fl">经典姜母鸭套餐</span>
      <span class="rig fr">￥<em>13</em></span>
    </li>
    <li>
      <strong>4</strong>
      <span class="left fl">闽南版海南鸡套餐</span>
      <span class="rig fr">￥<em>45</em></span>
    </li>
    <li>
      <strong>5</strong>
      <span class="left fl">秘汁可乐小鸡腿套餐</span>
      <span class="rig fr">￥<em>91</em></span>
    </li>
    <li>
      <strong>6</strong>
      <span class="left fl">闽南版海南鸡套餐</span>
      <span class="rig fr">￥<em>20</em></span>
    </li>
    <li>
      <strong>7</strong>
      <span class="left fl">经典姜母鸭套餐</span>
      <span class="rig fr">￥<em>10</em></span>
    </li>
    <li>
      <strong>8</strong>
      <span class="left fl">秘汁可乐小鸡腿套餐</span>
      <span class="rig fr">￥<em>45</em></span>
    </li>
  </ul>
</template>
<script>

export default {
  components: {

  },

  data() {
    return {
    }
  },

  methods: {

  }
}
</script>
<style lang="scss" scoped>
ul{
  li{
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    &:not(:last-child){
      border-bottom:1px #ddd dashed;
    }
    &:hover{
      color: #1389fd
    }
    strong{
      background-color: #fff1c8;
      height: 20px;
      width: 20px;
      text-align: center;
      float: left;
      color: #ff8d00;
      border-radius: 20px;
      line-height: 20px;
      margin: 10px 6px 0 0;
    }
    .rig{
      background-color: #ffecba;
      line-height: 20px;
      padding: 1px 2px;
      border-radius: 20px;
      margin-top: 7px;
      color: #ff8d40;
      border: 1px solid #ffc57d;
      em{
        padding: 1px 6px;
        background-color: #ffffff;
        border-radius: 20px;
        text-align: center;
        color: #ff6700;
        font-weight: bold;
      }
    }
  }
}
</style>

