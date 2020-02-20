<template>
  <ul class="scoreList">
    <li v-for="(li,index) in scoreList" :key="li.id+index">
      <h4 class="fl">{{ li.customerName }}</h4>
      <span class="col-2 fr">
        <el-rate
          v-model="li.customerGrade"
          :colors="['#ff6700', '#ffca54', '#64d89b']"
          class="score"
          disabled
          show-score
          text-color="#64d89b"
        />
        {{ li.commentTime }}</span>
      <div class="cb" />
      <p class="col-2">{{ li.commentContent }}</p>
    </li>
  </ul>
</template>
<script>

export default {
  components: {

  },

  data() {
    return {
      scoreList: [
        { 'id': '32110200026905', 'crawlCompId': '121E2CECC0A1234889910A74FC41234C', 'compName': '鱼丸粉丝小吃店', 'customerName': '大彭友的小彭友', 'customerGrade': 2, 'commentContent': '食物不干净，吃了拉肚子', 'commentTime': '2019-09-12', 'reply': null, 'commentPhoto': 'demo4.jpg' },
        { 'id': '30011', 'crawlCompId': '121E2CECC0A1234889910A74FC41234C', 'compName': '鱼丸粉丝小吃店', 'customerName': '张小龙', 'customerGrade': 3, 'commentContent': '不合胃口', 'commentTime': '2019-09-11', 'reply': '3', 'commentPhoto': 'demo4.jpg' },
        { 'id': '30009', 'crawlCompId': '121E2CECC0A1234889910A74FC41234C', 'compName': '鱼丸粉丝小吃店', 'customerName': '由宇西', 'customerGrade': 3, 'commentContent': '不想点了', 'commentTime': '2019-08-20', 'reply': '3', 'commentPhoto': 'demo4.jpg' },
        { 'id': '774E2CECC0A1234889910A74FC488994', 'crawlCompId': '121E2CECC0A1234889910A74FC41234C', 'compName': '鱼丸粉丝小吃店', 'customerName': '小雨', 'customerGrade': 4, 'commentContent': '面泡太久都陀了，汤太少！', 'commentTime': '2019-08-15', 'reply': null, 'commentPhoto': 'demo4.jpg' },
        { 'id': '30010', 'crawlCompId': '121E2CECC0A1234889910A74FC41234C', 'compName': '鱼丸粉丝小吃店', 'customerName': '马云', 'customerGrade': 3, 'commentContent': '挺不错', 'commentTime': '2019-07-14', 'reply': '3', 'commentPhoto': 'demo4.jpg' }
      ]
    }
  },

  methods: {

  }
}
</script>
<style lang="scss" scoped>
ul{
  li{
    height: 64px;
    padding: 8px 0;
    cursor: pointer;
    &:not(:last-child){
      border-bottom:1px #ddd dashed;
    }
    &:hover{
      color: #1389fd
    }
    .score{
      color:#ffac40;
      margin-right: 10px;
      font-weight: 900;
      font-size: 18px;
      &.col-r{
        color:rgb(240, 64, 64) !important
      }
      .el-rate__icon{
        margin-right:0
      }
    }
    p{
      height: 30px;
      line-height: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>

