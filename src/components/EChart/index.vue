<!-- 线性图表 -->
<template>
  <div :id="id" :style="{height:chartHeight,width:chartWidth}" class="chart" />
</template>

<script>
import { uuid } from '@/utils/uuid'
import echarts from 'echarts'

export default {
  name: 'LineChart',
  props: {
    chartType: { // 图表类型
      type: String,
      default() {
        // 图表类型 line/bar/pie/radar/funnel
        return 'line'
      }
    },
    color: { // 颜色
      type: Array,
      default() {
        return
      }
    },
    titleText: { // 主标题
      type: String,
      default() {
        return 'title'
      }
    },
    subText: { // 次级标题
      type: String,
      default() {
        return ''
      }
    },
    xText: { // 横轴文本
      type: String,
      default() {
        return 'x-text'
      }
    },
    yText: { // 纵轴文本
      type: String,
      default() {
        return 'y-text'
      }
    },
    chartData: { // 图表数据
      type: Object,
      default() {
        return
      }
    },
    width: {
      type: String,
      default() {
        return
      }
    },
    height: {
      type: String,
      default() {
        return
      }
    },
    config: { // 配置
      type: Object,
      default() {
        return
      }
    }
  },
  data() {
    return {
      id: '',
      chartHeight: '',
      chartWidth: ''
    }
  },
  watch: {// 监听数据变化重绘
    chartData: function() {
      this.drawChart()
    }
  },
  mounted() {
    this.drawChart()
  },
  created() {
    this.id = uuid() // 生成图表的唯一ID
    this.generatorWithAndHeight()
  },
  methods: {
    // 生成渲染图表div的宽度与高度
    generatorWithAndHeight() {
      this.chartWidth = this.width ? this.width : '100%'
      this.chartHeight = this.height ? this.height : '100%'
    },
    // 绘制图表
    drawChart() {
      const chart = echarts.init(document.getElementById(this.id))
      // 绑定点击事件
      const self = this
      chart.on('click', function(val) {
        self.$emit('chartClick', val)
      })
      if (chart === undefined) {
        console.error(`echarts init dom id ${this.id} failed`)
        return
      }
      chart.clear() // 先清空数据
      switch (this.chartType) {
        case 'line': // 折线图
          chart.setOption(this.generatorLineOption())
          break
        case 'bar': // 柱状图
          chart.setOption(this.generatorBarOption())
          break
        case 'pie': // 饼图
          chart.setOption(this.generatorPieOption())
          break
        case 'radar': // 雷达图
          chart.setOption(this.generatorRadarOption())
          break
        case 'map': // 地图
          this.$nextTick(() => {
            chart.setOption(this.generatorMapOption())
          })
          break
        case 'funnel': // 漏斗图
          chart.setOption(this.generatorFunnelOption())
          break
        default:
          console.error(`chartType ${this.chartType} is invalid`)
          break
      }
      let work = null
      window.addEventListener('resize', function() {
        self.generatorWithAndHeight()
        if (work == null) {
          work = setTimeout(function() {
            chart.resize()
            work = null
          }, 100)
        }
      })
    },
    generatorLineOption() {
      return {
        // 图表标题
        title: {
          text: this.titleText,
          subtext: this.subText,
          x: this.config.x ? this.config.x : 'left', // 左右位置
          y: this.config.y ? this.config.y : 0, // 上下位置
          textStyle: this.config.textStyle ? this.config.textStyle : { color: '#777' }
        },
        // 提示框: trigger-类型（item、axis）,formatter-格式化 （a：系列名称，b：类目值，c：数值）
        tooltip: this.config.tooltip ? this.config.tooltip : { trigger: 'axis' },
        legend: this.config.legend,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category', // 轴类型
          data: this.chartData.xAxisData,
          // 图表刻度线样式
          axisLine: this.config.axisLine ? this.config.axisLine : { lineStyle: { color: '#777' }},
          // 图表中辅助线线样式
          splitLine: this.config.splitLine ? this.config.splitLine : { show: false }
        },
        yAxis: {
          type: 'value', // 轴类型
          axisLine: this.config.axisLine ? this.config.axisLine : { lineStyle: { color: '#777' }},
          splitLine: this.config.splitLine ? this.config.splitLine : { lineStyle: { color: '#ccc' }}
        },
        series: this.chartData.yAxisData
      }
    },
    generatorBarOption() {
      return {
        title: {
          text: this.titleText,
          subtext: this.subText,
          x: this.config.x ? this.config.x : 'left', // 左右位置
          y: this.config.y ? this.config.y : 0, // 上下位置
          textStyle: this.config.textStyle ? this.config.textStyle : { color: '#777' }
        },
        color: this.color,
        legend: this.config.legend,
        // 提示框: trigger-类型（item、axis）,formatter-格式化 （a：系列名称，b：类目值，c：数值）
        tooltip: this.config.tooltip ? this.config.tooltip : { trigger: 'axis' },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: this.chartData.yAxis[0].type === 'value' ? 'category' : 'value', // 轴类型
            data: this.chartData.xAxisData,
            // 图表刻度线样式
            axisLine: this.config.axisLine ? this.config.axisLine : { lineStyle: { color: '#777' }},
            // 图表中辅助线线样式
            splitLine: this.config.splitLine ? this.config.splitLine : { show: false },
            axisLabel: {
              interval: 0,
              show: true,
              textStyle: {
                color: this.config.xyFontColor
              }
            }
          }
        ],
        yAxis: this.chartData.yAxis,
        series: this.chartData.yAxisData
      }
    },
    generatorPieOption() {
      return {
        // 图表标题
        title: {
          text: this.titleText,
          subtext: this.subText,
          x: this.config.x ? this.config.x : 'left', // 左右位置
          y: this.config.y ? this.config.y : 0, // 上下位置
          textStyle: this.config.textStyle ? this.config.textStyle : { color: '#777' }
        },
        // 提示框: trigger-类型（item、axis）,formatter-格式化 （a：系列名称，b：数据项名称，c：数值, d：百分比）
        tooltip: this.config.tooltip ? this.config.tooltip : { trigger: 'item' },
        // 图例 left-左右，top-上下，itemGap-间距，textStyle-字体样式
        legend: this.config.legend,
        series: [
          {
            type: 'pie',
            roseType: this.config.roseType, // 饼图模式-（false,radius，area）
            radius: this.config.radius, // 饼图块宽度
            center: this.config.center, // 饼图位置
            data: this.chartData.data, // 数据 name-数据名称， value-数据值
            label: this.chartData.label,
            itemStyle: {
              emphasis: { // 鼠标 hover 高亮样式
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.4)'
              },
              normal: this.chartData.normal
            }
          }
        ]
      }
    },
    generatorRadarOption() {
      return {
        title: {
          text: this.titleText,
          subtext: this.subText,
          x: this.config.x ? this.config.x : 'left', // 左右位置
          y: this.config.y ? this.config.y : 0, // 上下位置
          textStyle: this.config.textStyle ? this.config.textStyle : { color: '#777' }
        },
        tooltip: this.config.tooltip ? this.config.tooltip : { trigger: 'item' },
        radar: {
        // shape: 'circle',
          radius: this.config.radius ? this.config.radius : '55%',
          center: this.config.center ? this.config.center : ['50%', '55%'],
          name: this.config.name ? this.config.name : {
            textStyle: {
              color: '#777'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(7, 155, 225, 0.4)',
                'rgba(140, 231, 244, 0.4)'],
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10
            }
          },
          axisLine: {
            show: false
          },
          splitLine: { // 背景线条样式
            lineStyle: {
              color: ['#2474e1', '#5292ea']
            }
          },
          indicator: this.chartData.xAxisData
        },
        series: [{
          name: '',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: this.chartData.yAxisData,
          label: this.chartData.label ? this.chartData.label : {
            show: true,
            color: '#284d6d'
          },
          symbol: 'circle', // 拐点类型
          symbolSize: 4, // 拐点大小
          itemStyle: this.chartData.itemStyle ? this.chartData.itemStyle : { // 拐点颜色
            color: 'rgba(14, 255, 65, 0.8)'
          },
          areaStyle: this.chartData.areaStyle ? this.chartData.areaStyle : {// 背景区域
            normal: {
              color: 'rgba(14, 255, 65, 0.3)'
            }
          },
          lineStyle: this.chartData.lineStyle ? this.chartData.lineStyle : {// 线条区域
            color: 'rgba(14, 255, 65, 0.8)',
            width: 1
          }
        }]
      }
    },
    generatorFunnelOption() {
      return {
        title: {
          text: this.titleText,
          subtext: this.subText,
          x: this.config.x ? this.config.x : 'left', // 左右位置
          y: this.config.y ? this.config.y : 0, // 上下位置
          textStyle: this.config.textStyle ? this.config.textStyle : { color: '#777' }
        },
        legend: this.config.legend,
        // 提示框: trigger-类型（item、axis）,formatter-格式化 （a：系列名称，b：类目值，c：数值）
        tooltip: this.config.tooltip ? this.config.tooltip : { trigger: 'axis' },
        series: [
          {
            name: '',
            type: 'funnel',
            left: '5%',
            width: '85%',
            height: '75%',
            min: 0,
            max: 100,
            gap: 10,
            label: {
              position: 'inside',
              formatter: '{b} {c}%'
            },
            itemStyle: this.chartData.itemStyle ? this.chartData.itemStyle : { // 拐点颜色
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: { // 鼠标 hover 高亮样式
              shadowBlur: 5,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.4)'
            },
            data: this.chartData.data // 数据 name-数据名称， value-数据值
          }
        ]
      }
    },
    generatorMapOption() {
      return {
        title: {
          text: this.titleText,
          subtext: this.subText,
          textStyle: this.config.textStyle
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function(params) {
            return params.seriesName + '<br/>' + params.name
          }
        },
        visualMap: {
          show: false,
          min: 1,
          max: 340,
          inRange: {
            color: [
              '#17acd0',
              '#17acd0',
              '#17acd0',
              '#16a5ce',
              '#16a5ce',
              '#16a5ce',
              '#159ecc',
              '#159ecc',
              '#159ecc',
              '#1496c9',
              '#1496c9',
              '#1496c9',
              '#1392c7',
              '#1392c7',
              '#1392c7',
              '#1288c4',
              '#1288c4',
              '#1288c4',
              '#107ec1',
              '#107ec1',
              '#107ec1',
              '#107abf',
              '#107abf',
              '#107abf',
              '#0f74bd',
              '#0f74bd',
              '#0f74bd',
              '#0d69ba',
              '#0d69ba',
              '#0d69ba',
              '#0d64b8',
              '#0d64b8',
              '#0d64b8',
              '#0c61b7',
              '#0c61b7'
            ]
          }
          // text: ['High', 'Low'], // 文本，默认为数值文本
          // calculable: true
        },
        series: [
          {
            name: '中国',
            type: 'map',
            roam: false,
            map: '中国',
            // 文本位置修正
            textFixed: {
              Alaska: [20, -20]
            },
            // itemStyle: {
            //   emphasis: {
            //     areaColor: '#d0f2ff', // 设置为空字符串可使颜色不变
            //     label: {
            //       show: true, // 默认是否显示省份名称
            //       color: '#198bff'
            //     },
            //     areaStyle: {
            //       color: '#3fb0e6' // 选中状态的地图板块颜色
            //     }
            //   },
            //   normal: {
            //     label: {
            //       show: true, // 默认是否显示省份名称
            //       fontWeight: 900,
            //       color: '#123559'
            //     },
            //     borderWidth: 0.5
            //   }
            // },
            itemStyle: {
              normal: {
                label: {
                  show: true, // 默认是否显示省份名称
                  color: '#def4ff'
                },
                areaStyle: {
                  color: '#3fb0e6' // 默认的地图板块颜色
                },
                borderWidth: 0,
                borderColor: '#e1e1e1'
              },
              emphasis: {
                areaColor: '#fff', // 设置为空字符串可使颜色不变
                label: {
                  show: true, // 默认是否显示省份名称
                  color: '#198bff'
                },
                areaStyle: {
                  color: '#3fb0e6' // 选中状态的地图板块颜色
                }
              }
            },
            data: this.chartData.data
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
