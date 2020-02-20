<template>
  <div>
    <Chart
      ref="pie"
      title-text="已获取(本月)"
      :chart-data="pieData"
      height="260px"
      :config="pieConfig"
      chart-type="pie"
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
      colorList: [// 渐变颜色预设
        new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
          offset: 0,
          color: '#079755'
        }, {
          offset: 1,
          color: '#40f9b1'
        }]),
        new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
          offset: 0,
          color: '#0750c7'
        }, {
          offset: 1,
          color: '#0096de'
        }]),
        new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
          offset: 0,
          color: '#40acf7'
        }, {
          offset: 1,
          color: '#b8eaff'
        }]),
        new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
          offset: 0,
          color: '#b3cfef'
        }, {
          offset: 1,
          color: '#dfebf7'
        }])
      ],
      colorList1: [
        '#3fb0e6', '#FFE066', '#00CECB', '#f76391'
      ],
      pieConfig: {
        y: -4,
        center: ['50%', '65%'],
        radius: ['15%', '50%'],
        legend: {
          left: 'right',
          top: '10%',
          itemGap: 12,
          textStyle: {
            color: '#666',
            fontSize: 13
          }
        }
      },
      pieData: {
        data: [
          { check_result: '1', name: '符合要求', value: 120 },
          { check_result: '2', name: '限期整改', value: 90 },
          { check_result: '3', name: '当场整改', value: 50 },
          { check_result: '4', name: '当场处罚', value: 80 }
        ],
        label: {
          normal: {
            formatter: '{b} {c}',
            textStyle: {
              color: '#777',
              fontSize: 13
            }
          }
        },
        normal: {
          // 定义一个颜色list
          // 定义一个list，然后取得不同的值
          color: (params) => {
            return this.colorList1[params.dataIndex]
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
