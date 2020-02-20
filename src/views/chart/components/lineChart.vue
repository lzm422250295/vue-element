<template>
  <div>
    <Chart
      ref="line"
      title-text="某某线图"
      :chart-data="lineData"
      height="260px"
      :config="lineConfig"
      chart-type="line"
      @chartClick="chartClick"
    />
  </div>
</template>
<script>
import Chart from '@/components/EChart'
import echarts from 'echarts'
export default {
  components: {
    Chart
  },
  data() {
    return {
      lineData: {
        yAxisData: [{
          name: '类型一',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#0b88d2'
              }, {
                offset: 1,
                color: '#ffe'
              }])
            }
          },
          lineStyle: {
            color: '#39a3e2'
          },
          itemStyle: {
            color: '#39a3e2'
          }
        }, {
          name: '类型二',
          data: [400, 532, 601, 434, 390, 430, 620],
          type: 'line',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#ec4064'
              }, {
                offset: 1,
                color: '#ffe'
              }])
            }
          },
          lineStyle: {
            color: '#ec4064'
          },
          itemStyle: {
            color: '#ec4064'
          }
        }],

        xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      lineConfig: {
        legend: {
          data: ['类型一', '类型二'],
          left: 'right',
          top: '5%',
          itemGap: 12,
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
