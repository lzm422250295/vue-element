<template>
  <div>
    <Chart
      ref="bar"
      title-text=""
      :chart-data="barData"
      :color="color"
      :config="barConfig"
      chart-type="funnel"
      @chartClick="chartClick"
    />
  </div>
</template>
<script>
import Chart from '@/components/EChart'
import echarts from 'echarts'
// import { getAllCity } from '@/api/chart'
// import echarts from 'echarts'
export default {
  components: {
    Chart
  },
  data() {
    return {
      color: ['#00CECB', '#9F86C0', '#becbd6'],
      barData: {
        data: [
          { value: 60, name: '浏览网站' },
          { value: 40, name: '开始订单' },
          { value: 20, name: '提交订单' },
          { value: 80, name: '支付订单' },
          { value: 100, name: '完成订单' }
        ],
        itemStyle: {
          normal: {
            // 柱形图圆角，初始化效果
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#30ff96' },
                { offset: 0.5, color: '#23bb99' },
                { offset: 1, color: '#0fa07f' }
              ]
            )
          }
        },
        xAxis: [
          {
            type: 'category'
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: { color: '#fff' }
            },
            splitLine: {
              lineStyle: { color: '#506e8d' }
            }
          }
        ]
      },
      barConfig: {
        textStyle: { color: '#fff' }
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    chartClick(val) {

    },
    getData() {
      // getAllCity().then(res => {
      //   this.barData.xAxisData = res.data.x
      //   this.barData.yAxisData[0].data = res.data.y
      //   this.$refs.bar.drawChart()
      // })
    }
  }
}
</script>
