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
            data: ['模拟字段超出处理方法', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: {
              formatter: function(params) { // 标签输出形式 ---请开始你的表演
                // var index = 10
                var newstr = ''
                for (let i = 0; i < params.length; i++) {
                  const tmp = params.substring(i, i + 1)
                  newstr += tmp
                  // +'\n'
                }
                if (newstr.length > 5) {
                  return newstr.substring(0, 2) + '...'
                } else {
                  return newstr
                }
              }
            }
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
