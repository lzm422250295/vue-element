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
            axisLine: {
              lineStyle: { color: '#fff' }
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxisData: [{
          name: '商城用户',
          type: 'bar',
          data: [1000, 852, 801, 751, 643, 450],
          barWidth: '20%',
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
        }, {
          name: '新增用户',
          type: 'bar',
          data: [200, 300, 400, 320, 180, 250],
          barWidth: '20%',
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
                  { offset: 0, color: '#ffee33' },
                  { offset: 0.5, color: '#ffd01d' },
                  { offset: 1, color: '#ffb005' }
                ]
              )
            }
          }
        }, {
          name: '增长率',
          type: 'line',
          data: [600, 852, 401, 551, 243, 350],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#21ecb4' },
                  { offset: 1, color: '#21ecb4' }
                ]
              )
            }
          }
        }],
        xAxisData: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
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
