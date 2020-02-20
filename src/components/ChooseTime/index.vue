<template>
  <div :style="`width:${width}%;padding:0 0 0 60px;`">
    <div class="block">
      <div class="line">
        <strong :style="`left:${leftTimePx}%`" class="left">{{ leftTime }}</strong>
        <strong :style="`left:${rightTimePx}%`" class="right">{{ rightTime }}</strong>
      </div>
      <el-popover
        class="reTime"
        placement="top"
        width="400"
        trigger="click"
      >
        <p>重设最早时间：</p>
        <el-date-picker
          v-model="otherDay"
          style="margin-top:20px;"
          type="date"
          placeholder="选择日期"
          @change="changeOtherDay"
        />
        <el-button slot="reference" size="mini" type="primary" icon="el-icon-date" circle />
      </el-popover>
      <el-slider
        v-model="value"
        :show-tooltip="false"
        :marks="marks"
        :max="maxDay"
        range
        @change="getTime"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'RLbarChart',
  props: {
    width: {
      type: Number,
      default() {
        return
      }
    }
  },
  data() {
    return {
      today: moment(), // 当天时间对象
      otherDay: moment().subtract(1.5, 'year'), // 一年半前时间对象
      midDay: moment().subtract(this.maxDay / 2, 'days').format('MM'), // 中间格式化时间时间
      value: [0, 100], // 时间轴值
      marks: {} // 时间轴刻度
    }
  },
  computed: {
    maxDay: function() { // 最大值
      return this.today.diff(this.otherDay, 'days')
    },
    oneYearLate: function() {
      return this.today.diff(moment().subtract(0.5, 'year'), 'days')
    },
    leftTimePx: function() { // 左侧时间位移
      return this.value[0] / this.maxDay * 100
    },
    rightTimePx: function() { // 右侧时间位移
      return this.value[1] / this.maxDay * 100
    },
    leftTime: function() { // 左侧时间
      return moment().subtract(this.maxDay - this.value[0], 'days').format('YYYY-MM-DD')
    },
    rightTime: function() { // 右侧时间
      return moment().subtract(this.maxDay - this.value[1], 'days').format('YYYY-MM-DD')
    }
  },
  beforeMount() { // 挂载之前改变data
    this.setMarks()
    this.value = [this.oneYearLate, this.maxDay]
  },
  mounted() {
    this.$emit('init', moment().subtract(1, 'year').format('YYYYMMDD'), this.today.format('YYYYMMDD'))
  },
  methods: {
    changeOtherDay(val) {
      this.value = [this.maxDay / 2, this.maxDay]
      // marks赋值
      this.setMarks()
    },
    setMarks() {
      this.marks = {}
      for (let i = 8; i >= 0; i--) {
        if (i === 0) {
          this.marks[0] = {
            label: this.$createElement('p', moment(this.otherDay).format('YYYY-M'))
          }
        } else {
          this.marks[this.maxDay * i / 8] = {
            label: this.$createElement('p', moment().subtract(this.maxDay - this.maxDay * i / 8, 'days').format('YYYY-M'))
          }
        }
      }
    },
    // 获取时间轴值-请求图表数据
    getTime(val) {
      this.$emit('getTime', [moment().subtract(this.maxDay - val[0], 'days').format('YYYYMMDD'), moment().subtract(this.maxDay - val[1], 'days').format('YYYYMMDD')])
    }
  }
}
</script>
<style lang="scss" scoped>
.block{
    position: relative;
  .reTime{
    position: absolute;
    left: -50px;
    top: 7px;
    .el-button--mini.is-circle {
      padding:5px;
    }
  }
 /deep/ .el-slider__stop {
    border: 1px solid #1e8ff1;
  }
  /deep/ .el-slider__runway{
    background-color: #d6dce8;
  }
  position: relative;
  .el-slider__marks-text{
    p{
      width: 100px;
      text-align: center;
      font-size: 12px;
    }
  }
  .line{
    width: 100%;
    position: relative;
    strong{
      font-size: 14px;
      position: absolute;
      top: -14px;
      color: #1389fd;
      margin-left: -38px;
      width: 72px;
    }
  }
}

</style>
