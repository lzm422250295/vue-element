<template>
  <div>
    <Chart
      ref="pie"
      title-text="数据类型分布情况"
      :chart-data="pieData"
      :height="`${height}px`"
      :config="pieConfig"
      chart-type="pie"
      @chartClick="chartClick"
    />
  </div>
</template>
<script>
import Chart from '@/components/EChart'
import echarts from 'echarts'
// import { getPieData } from '@/api/chart'

export default {
  components: {
    Chart
  },
  data() {
    return {
      height: document.body.clientHeight / 2 - 60,
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
        }]),
        new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
          offset: 0,
          color: '#ffab6f'
        }, {
          offset: 1,
          color: '#f5883b'
        }]),
        new echarts.graphic.LinearGradient(1, 0, 0, 1, [{
          offset: 0,
          color: '#ffc521'
        }, {
          offset: 1,
          color: '#ffda70'
        }])
      ],
      colorList1: [
        '#3fb0e6', '#FFE066', '#00CECB', '#aff198', '#cc9ee4', '#f76391'
      ],
      pieConfig: {
        x: 'right',
        textStyle: { color: '#fff' },
        y: -4,
        center: ['50%', '65%'],
        radius: ['20%', '70%'],
        legend: {
          left: 'right',
          top: '10%',
          itemGap: 12,
          textStyle: {
            color: '#fff',
            fontSize: 13
          }
        }
      },
      pieData: {
        data: [
          { check_result: '1', name: '药品生产', value: 110 },
          { check_result: '2', name: '药品经营', value: 90 },
          { check_result: '3', name: '器械生产', value: 50 },
          { check_result: '4', name: '器械经营', value: 80 },
          { check_result: '4', name: '化妆品生产', value: 40 },
          { check_result: '4', name: '化妆品经营', value: 60 }
        ],
        label: {
          normal: {
            formatter: '{c}',
            position: 'inner',
            textStyle: {
              color: '#082340',
              fontSize: 14,
              fontWeight: 900
            }
          }
        },
        normal: {
          // 定义一个颜色list
          // 定义一个list，然后取得不同的值
          color: (params) => {
            return this.colorList[params.dataIndex]
          }
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
    getData(id) {
      // getPieData(id).then(res => {
      //   this.pieData.data = res.data
      //   this.$refs.pie.drawChart()
      // })
    }
  }
}
</script>
