<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="white-box">
          <Transfer
            ref="reference"
            :title="['查询字段选择（未选）','已选']"
            :option="option"
            :choosed="choosed"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Transfer from '@/components/Transfer'
export default {
  components: {
    Transfer
  },
  data() {
    return {
      activeNames: '',
      option: [{
        key: 1,
        label: '核查表名核查表名核查表名核查表名核查表名核查表名'
      }, {
        key: 2,
        label: '企业名称'
      }, {
        key: 4,
        label: '检查人员'
      }, {
        key: 3,
        label: '评定等级'
      }, {
        key: 5,
        label: '检查日期'
      }],
      choosed: [1, 2],
      form: {
        value1: '',
        value: '',
        name: ''
      },
      form2: {
        name: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.reference.creatData()
    })
  },
  methods: {

  }
}
</script>
