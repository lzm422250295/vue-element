<template>
  <div>
    <Chart
      ref="map"
      :chart-data="mapData"
      :config="mapConfig"
      title-text=""
      chart-type="map"
      @chartClick="chartClick"
    />
  </div>
</template>
<script>
import Chart from '@/components/EChart'
import echarts from 'echarts'
import china from '@/components/EChart/china.json'
echarts.registerMap('中国', china)

export default {
  components: {
    Chart
  },
  data() {
    return {
      lastColor: '',
      lastNum: '',
      mapData: {
        data: [
          { name: '黑龙江', data: 880531, value: 10 },
          { name: '内蒙古', data: 880834, value: 20 },
          { name: '新疆', data: 880814, value: 30 },
          { name: '吉林', data: 880776, value: 40 },
          { name: '辽宁', data: 880674, value: 50 },
          { name: '北京', data: 880623, value: 60 },
          { name: '天津', data: 880795, value: 70 },
          { name: '甘肃', data: 880702, value: 80 },
          { name: '宁夏', data: 880702, value: 80 },
          { name: '青海', data: 880850, value: 90 },
          { name: '山西', data: 880904, value: 100 },
          { name: '河北', data: 880938, value: 110 },
          { name: '山东', data: 880726, value: 120 },
          { name: '陕西', data: 880758, value: 130 },
          { name: '河南', data: 880742, value: 140 },
          { name: '山东', data: 880862, value: 81 },
          { name: '西藏', data: 880923, value: 160 },
          { name: '四川', data: 880882, value: 170 },
          { name: '重庆', data: 880600, value: 180 },
          { name: '湖北', data: 880601, value: 190 },
          { name: '安徽', data: 880602, value: 200 },
          { name: '江苏', data: 880603, value: 210 },
          { name: '上海', data: 880604, value: 220 },
          { name: '浙江', data: 880605, value: 280 },
          { name: '江西', data: 880606, value: 240 },
          { name: '湖南', data: 880607, value: 250 },
          { name: '贵州', data: 880608, value: 260 },
          { name: '广西', data: 880609, value: 270 },
          { name: '广东', data: 880610, value: 280 },
          { name: '福建', data: 880611, value: 290 },
          { name: '云南', data: 880612, value: 251 },
          { name: '澳门', data: 880613, value: 310 },
          { name: '香港', data: 880614, value: 320 },
          { name: '海南', data: 880615, value: 330 },
          { name: '台湾', data: 880654, value: 340 }
        ] },
      // height: document.body.clientHeight / 100 * 55 - 60,
      mapConfig: {
        textStyle: { color: '#fff' },
        y: -4
      }
    }
  },
  methods: {
    chartClick(val) {
      if (val.value === 1) {
        this.mapData.data[val.dataIndex].value = this.lastColor
        this.$emit('getAllData', '')
        this.$refs.map.drawChart(1)
        return
      } else if (this.lastColor !== '') { this.mapData.data[this.lastNum].value = this.lastColor }

      this.mapData.data[val.dataIndex].value = 1
      this.$emit('getAllData', val.data.data)

      this.$refs.map.drawChart(1)
      this.lastNum = val.dataIndex
      this.lastColor = val.value
      return
    }
  }
}
</script>
