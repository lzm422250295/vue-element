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
      color: ['#3fb0e6', '#FFE066', '#00CECB', '#9F86C0', '#becbd6'],
      barData: {
        yAxis: [
          {
            type: 'value'
          }, {
            type: 'value',
            name: '合格率',
            max: 100,
            min: 0,
            axisLabel: {
              formatter: '{value}%'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxisData: [{
          name: '类型一',
          type: 'bar',
          data: [10, 52, 200, 334, 390, 330, 220],
          itemStyle: {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [10, 10, 0, 0]
            }
          }
        },
        {
          name: '类型二',
          type: 'bar',
          data: [5, 20, 150, 254, 190, 230, 120],
          itemStyle: {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [10, 10, 0, 0]
            }
          }
        },
        {
          name: '类型三',
          type: 'bar',
          data: [2, 12, 120, 124, 140, 200, 20],
          itemStyle: {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [10, 10, 0, 0]
            }
          }
        },
        {
          name: '类型四',
          type: 'bar',
          data: [15, 50, 110, 140, 90, 150, 50],
          itemStyle: {
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [10, 10, 0, 0]
            }
          }
        },
        {
          name: '类型五',
          type: 'line',
          yAxisIndex: 1,
          data: [10, 45, 23, 38, 14, 35, 80]
        }],

        xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      barConfig: {
        legend: {
          data: ['类型一', '类型二', '类型三', '类型四', '类型五'],
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
