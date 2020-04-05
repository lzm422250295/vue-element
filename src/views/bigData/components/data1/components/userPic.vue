<template>
  <div>
    <Chart
      ref="bar"
      title-text=""
      :chart-data="barData"
      :color="color"
      :config="barConfig"
      chart-type="bar"
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
        xAxis: [
          {
            type: 'category'
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: false
            // type: 'value',
            // axisLine: {
            //   lineStyle: { color: '#fff' }
            // },
            // splitLine: {
            //   lineStyle: { color: '#506e8d' }
            // }
          }
        ],
        yAxisData: [{
          name: '总数据量',
          type: 'bar',
          data: [200, 352, 601, 251, 143],
          barWidth: '50%',
          itemStyle: {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [10, 10, 0, 0],
              label: {
                show: true, // 开启显示
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 'bold'
                }
              },
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#0de8fe' },
                  { offset: 0.5, color: '#0eace6' },
                  { offset: 1, color: '#0e82e6' }
                ]
              )
            }
          }
        }],
        xAxisData: ['19以下', '20-29', '30-39', '40-49', '50以上']
      },
      barConfig: {
        rotate: 45,
        textStyle: {
          color: '#fff',
          fontSize: 15
        },
        axisLine: {
          lineStyle: { color: '#fff' },
          rotate: 60
        },
        grid: {
          left: '3%',
          bottom: '8%'
        }
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
