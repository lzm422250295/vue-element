<template>
  <div>
    <ChooseTime style="margin-top:20px;" :width="90" @getTime="getSelTime" @init="getStartTime" />
    <div class="cb" />
    <el-divider />
    <el-row>
      <div>初始的时间：</div>
      <el-date-picker
        v-model="value2"
        format="yyyy - MM - dd"
        value-format="yyyyMMdd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      />
    </el-row>
    <el-row>
      <div style="margin-top:20px;">选择的时间：</div>
      <el-date-picker
        v-model="value1"
        format="yyyy - MM - dd"
        value-format="yyyyMMdd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
      />
    </el-row>
  </div>
</template>
<script>
import ChooseTime from '@/components/ChooseTime'

export default {
  name: 'ChooseTimeDemo',
  components: {
    ChooseTime
  },
  data() {
    return {
      value1: [],
      value2: []
    }
  },
  methods: {
    getSelTime(val) {
      this.value1 = val
    },
    getStartTime(start, end) {
      this.value2 = [start, end]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

