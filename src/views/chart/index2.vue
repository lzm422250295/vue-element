<template>
  <el-row :gutter="12">
    <el-col :span="6">
      <el-row class="white-box">
        <div class="msg">
          <el-avatar :size="80" :src="url" />
          <div class="tit">张三</div>
          <div class="operate"><span class="col-b" style="cursor:pointer" @click="dialogVisible = true">修改资料</span> | <span>可用积分：<em class="col-g f18 fb">200</em></span></div>
        </div>
        <ul class="nav">
          <li :class="{'active':state===1}" @click="state = 1">积分获取</li>
          <li :class="{'active':state===2}" @click="state = 2">积分使用</li>
          <li :class="{'active':state===3}" @click="state = 3">密码修改</li>
          <li :class="{'active':state===4}" @click="state = 4">个人信息</li>
        </ul>
      </el-row>
    </el-col>
    <el-col :span="18">
      <div v-if="state===1">
        <el-row class="white-box">
          <PieChart />
          <Table
            :other-height="otherHeight"
            :choose-details.sync="chooseDetails"
            :table-data="tableData"
            :content-type="contentType"
            :pagination="pagination"
            :loading="loading"
            @currentChange="getCurrentData"
            @sizeChange="getSize"
          />
        </el-row>
      </div>
      <div v-else-if="state===2">
        <el-row class="white-box">
          2
        </el-row>
      </div>
      <div v-else-if="state===3">
        <el-row class="white-box">
          3
        </el-row>
      </div>
      <div v-else>
        <el-row class="white-box">
          4
        </el-row>
      </div>
    </el-col>
    <el-dialog
      title="修改资料"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import PieChart from './components/pieChart'
import Table from '@/components/Table/index'
import listFun from '@/mixin/listFun'

export default {
  // name: 'EchartDemo',
  components: {
    PieChart,
    Table
  },
  mixins: [listFun],
  data() {
    return {
      url: '',
      state: 1,
      dialogVisible: false,
      contentType: [
        {
          id: 1,
          prop: 'title',
          label: '类别',
          fixed: 'left'
        },
        {
          id: 2,
          prop: 'author',
          label: '项目',
          width: '100'
        },
        {
          id: 3,
          prop: 'display_time',
          label: '获取时间',
          width: '200',
          align: 'center'
        },
        {
          id: 4,
          prop: 'pageviews',
          label: '分值',
          width: '80'
        }]
    }
  },
  // 声明当前使用的组件
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取列表数据
    fetchData(pageNum = 1, pageSize = this.pagination.page) {
      this.loading = true
      const _pageNum = String(pageNum)
      const _pageSize = String(pageSize)
      // getList(this.form, _pageNum, _pageSize).then(res => {
      //   this.tableData = res.data.list
      //   this.pagination.currentPage = res.data.pageNum
      //   this.pagination.page = res.data.pageSize
      //   this.pagination.all = res.data.total
      //   this.loading = false
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.msg{
    text-align: center;
  .tit{
    font-size: 17px;
    margin: 20px 0;
    font-weight: bolder;
  }
  .operate{
    span{
      margin: 5px 10px;
    }
  }
}
.nav{
  text-align: center;
  margin: 50px 0;
  li{
    height: 40px;
    cursor:pointer;
    line-height: 40px;
    font-size: 18px;
    margin: 15px 0;
    font-weight: bolder;
    &.active{
      color: #1389fd;
    }
  }
}
</style>

