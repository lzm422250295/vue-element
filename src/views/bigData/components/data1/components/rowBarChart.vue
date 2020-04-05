<template>
  <div>
    <Chart
      ref="bar"
      title-text="数据量排行情况"
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
// import { getCountNum } from '@/api/chart'
// import echarts from 'echarts'
export default {
  components: {
    Chart
  },
  data() {
    return {
      color: ['#3fb0e6', '#5cdc9b'],
      barData: {
        xAxis: [
          {
            type: 'log',
            min: 0.01
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: { color: '#fff' }
            }
          }
        ],
        yAxisData: [{
          name: '总数据量',
          type: 'bar',
          barWidth: '50%',
          data: [1, 2, 5, 8, 9],
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                position: 'right', // 在上方显示
                textStyle: { // 数值样式
                  color: '#fff',
                  fontSize: 14
                }
              },
              // 柱形图圆角，初始化效果
              barBorderRadius: [0, 10, 10, 0],
              color: new echarts.graphic.LinearGradient(
                1, 0, 0, 0,
                [
                  { offset: 0, color: '#47f9ff' },
                  { offset: 0.5, color: '#32c6f7' },
                  { offset: 1, color: '#138ae5' }
                ]
              )
            }
          }
        }]
      },
      barConfig: {
        boundaryGap: ['0%', '35%'],
        rotate: 45,
        textStyle: { color: '#fff' },
        splitLine: {
          lineStyle: { color: '#506e8d' },
          show: true
        },
        axisLine: {
          lineStyle: { color: '#fff' }
        }
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    chartClick(val) {
      this.$emit('rowBarClick', val)
    },
    getData(id) {
      // getCountNum(id).then(res => {
      //   this.barData.yAxis[0].data = res.data.x
      //   for (let i = 0; i < res.data.y.length; i++) {
      //     this.barData.yAxisData[0].data[i] = {
      //       value: res.data.y[i],
      //       tableName: res.data.name[i],
      //       tit: res.data.x[i]
      //     }
      //   }
      //   this.$refs.bar.drawChart()
      // })
    }

  }
}
</script>
