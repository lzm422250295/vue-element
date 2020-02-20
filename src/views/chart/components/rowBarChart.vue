<template>
  <div>
    <Chart
      ref="bar"
      title-text="某某柱状图"
      :chart-data="barData"
      :color="color"
      height="260px"
      :config="barConfig"
      chart-type="bar"
      @chartClick="chartClick"
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
      color: ['#3fb0e6', '#5cdc9b'],
      barData: {
        yAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxisData: [{
          name: '类型一',
          type: 'bar',
          barWidth: '25%',
          data: [10, 52, 200, 334, 390, 330, 220],
          itemStyle: {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [0, 10, 10, 0]
            }
          }
        },
        {
          name: '类型二',
          type: 'bar',
          barWidth: '25%',
          data: [5, 20, 150, 254, 190, 230, 120],
          itemStyle: {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [0, 10, 10, 0]
            }
          }
        }]
      },
      barConfig: {
        splitLine: {
          show: true
        },
        legend: {
          data: ['类型一', '类型二'],
          left: 'right',
          top: '5%',
          itemGap: 12,
          borderRadius: 5,
          textStyle: {
            color: '#666',
            fontSize: 13
          }
        }
      }
    }
  },
  methods: {
    chartClick(val) {
    }
  }
}
</script>
