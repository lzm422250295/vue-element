<template>
  <ul>
    <li v-for="(li,index) in riskItemList" :key="li.id+index">
      <span class="type fl">{{ li.checkTypeName }}</span>
      <span class="result fl col-r">{{ li.checkResultName }}</span>
      <p class="cont fl">{{ li.itemContent }}</p>
      <span class="fr col-2">{{ li.inspectDate }}</span>
    </li>
  </ul>
</template>
<script>

export default {
  components: {

  },

  data() {
    return {
      riskItemList: [
        { 'itemContent': '在经营场所醒目位置公示食品经营许可证。', 'checkTypeName': '日常检查', 'inspectDate': '2019-10-10', 'checkResultName': '不符合', 'id': 'f3071bdd7b48c84f8cb9c9a5679d5ae5' },
        { 'itemContent': '是否存在食品安全管理的痕迹；整体管理情况及整改的态度；对管理的认知度、重视程度和配合度等；专业水平的掌握程度等等，由监管人员主观评分。', 'checkTypeName': '日常检查', 'inspectDate': '2019-10-10', 'checkResultName': '不符合', 'id': 'f3071bdd7b48c84f8cb9c9a5679d5ae5' },
        { 'itemContent': '采用危害分析与关键控制点、ISO22000、色标管理、“5S”“5C”“6T等先进管理方式；实行透明厨房、视频实时监控等社会监督方式；采用信息化手段采集、留存经营信息，建立食品安全追溯体系；在国家或省级食品安全示范创建中，被认定为示范单位的。', 'checkTypeName': '日常检查', 'inspectDate': '2019-10-10', 'checkResultName': '不符合', 'id': 'f3071bdd7b48c84f8cb9c9a5679d5ae5' },
        { 'itemContent': '在经营场所醒目位置公示食品经营许可证。', 'checkTypeName': '日常检查', 'inspectDate': '2019-10-09', 'checkResultName': '不符合', 'id': '6f4e18d3989ac44b8b9b3bb0c3adc8d4' },
        { 'itemContent': '监督检查结果记录表公示的时间、位置等符合要求。', 'checkTypeName': '日常检查', 'inspectDate': '2019-10-09', 'checkResultName': '不符合', 'id': '6f4e18d3989ac44b8b9b3bb0c3adc8d4' },
        { 'itemContent': '在经营场所醒目位置公示量化等级标识。', 'checkTypeName': '日常检查', 'inspectDate': '2019-10-09', 'checkResultName': '不符合', 'id': '6f4e18d3989ac44b8b9b3bb0c3adc8d4' },
        { 'itemContent': '特大食品经营许可证合法有效，经营场所、主体业态、经营项目等事项与食品经营许可证一致。', 'checkTypeName': '日常检查', 'inspectDate': '2019-10-09', 'checkResultName': '不符合', 'id': 'a96c103bc1bc024385487e803bda499c' },
        { 'itemContent': '在经营场所醒目位置公示食品经营许可证。', 'checkTypeName': '日常检查', 'inspectDate': '2019-10-09', 'checkResultName': '不符合', 'id': '6f4e18d3989ac44b8b9b3bb0c3adc8d4' }]
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
    .type,
    .result{
      text-align: center;
      color: white;
      line-height: 19px;
      height: 22px;
      padding: 1px 5px;
      margin-top:8px;

    }
    .type{
      background-color: #e7f2ff;
      color: #0c88ce;
      border: 1px #96d9ff solid;
      border-right:0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .result{
      margin-right:8px;
      background-color: #ffeef2;
      color: #ec728c;
      border: 1px solid #ffc9d4;
      border-left:0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    @media screen and (max-width: 1599px) {
      p{
        width: 38%;
      }
    }
    @media screen and (min-width: 1600px) {
      p{
        width: 57%;
      }
    }
    @media screen and (min-width: 1900px) {
      p{
        width: 61%;
      }
    }
    p{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &.lic{
      background-color: #fff5f8;
      border-radius: 4px;
      border: 1px solid #ffe4ed;
      margin-bottom: 4px;
      height: 36px;
      color: #ff0037;
      padding: 0 13px;
      line-height: 36px;
    }
  }
}
</style>

