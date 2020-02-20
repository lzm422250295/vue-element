<template>
  <div>
    <chart
      ref="radar"
      :chart-data="radarData"
      :config="radarConfig"
      height="260px"
      chart-type="radar"
      title-text="某某雷达图"
    />
  </div>
</template>
<script>
import Chart from '@/components/EChart'
// import echarts from 'echarts'
export default {
  components: {
    Chart
  },
  data() {
    return {
      radarData: {
        xAxisData: [
          { name: '评价口碑', max: 4500 },
          { name: '稽查执法', max: 3500 },
          { name: '日常检查', max: 1600 },
          { name: '飞行检查', max: 3800 },
          { name: '专项检查', max: 5200 },
          { name: '抽样检验', max: 2500 },
          { name: '双随机', max: 3500 },
          { name: '证书', max: 2500 }
        ],
        yAxisData: [
          {
            value: [3500, 2000, 800, 2800, 2500, 2500, 1800, 2300],
            name: '预算分配'
          }
        ]
      },
      radarConfig: {
      }
    }
  },
  methods: {
    chartClick(val) {
    }
  }
}
</script>
