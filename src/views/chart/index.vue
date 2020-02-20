<template>
  <div>

    <el-row :gutter="12" class="other-info">
      <el-col>
        <el-row class="white-box one">
          <i class="el-icon-s-data icon" />
          <h1>45.32</h1>
          <span>风险指数</span>
        </el-row>
      </el-col>
      <el-col>
        <el-row class="white-box two">
          <i class="el-icon-s-operation icon" />
          <h1>50%</h1>
          <span>监督检查合格率</span>
        </el-row>
      </el-col>
      <el-col>
        <el-row class="white-box thr">
          <i class="el-icon-s-release icon" />
          <h1>33.3%</h1>
          <span>抽检检验合格率</span>
        </el-row>
      </el-col>
      <el-col>
        <el-row class="white-box four">
          <i class="el-icon-s-shop icon" />
          <h1>3515</h1>
          <span>月售</span>
        </el-row>
      </el-col>
      <el-col>
        <el-row class="white-box five">
          <i class="el-icon-star-on icon" />
          <h1>4.0</h1>
          <span>评价口碑</span>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="15" class="index-box">
      <el-col :span="12">
        <div class="white-box">
          <LineChart />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="white-box">
          <barChart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="8" class="index-box">
        <div class="white-box">
          <rowBarChart />
        </div>
      </el-col>
      <el-col :span="8" class="index-box">
        <div class="white-box">
          <PieChart />
        </div>
      </el-col>
      <el-col :span="8" class="index-box">
        <div class="white-box">
          <RadarChart />
        </div>
      </el-col>
    </el-row>
    <el-row class="index-box">
      <div class="white-box">
        <div class="table-box">
          <el-table
            stripe
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              label="日期"
              width="200"
            >
              <template slot-scope="scope">
                <i class="el-icon-time" />
                <span style="margin-left: 10px">{{ scope.row.display_time }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="90"
              align="center"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>年龄: {{ scope.row.year }}</p>
                  <div slot="reference" class="name-wrapper">
                    {{ scope.row.author }}
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="性别"
              width="90"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.sex }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="联系电话"
              width="120"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.edit === true?false:true">{{ scope.row.phone }}</span>
                <el-input v-else v-model="scope.row.phone" size="mini" placeholder="请输入内容" />
              </template>
            </el-table-column>
            <el-table-column
              label="地址"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.edit === true?false:true">{{ scope.row.title }}</span>
                <el-input v-else v-model="scope.row.title" size="mini" placeholder="请输入内容" />
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                >{{ scope.row.edit === true? '完成':'编辑' }}</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  plain
                  @click="handleDelete(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <div class="line" />
        </div>
      </div></el-row>
    <el-row :gutter="15" class="index-box">
      <el-col :span="8">
        <div class="white-box">
          <h3 class="one">检查结果<i class="el-icon-more fr" /></h3>
          <List />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="white-box">
          <h3 class="two">商品排行<i class="el-icon-more fr" /></h3>
          <List2 />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="white-box">
          <h3 class="thr">客户评价<i class="el-icon-more fr" /></h3>
          <List3 />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RadarChart from './components/radarChart'
import LineChart from './components/lineChart'
import PieChart from './components/pieChart'
import BarChart from './components/barChart'
import rowBarChart from './components/rowBarChart'
import List from './components/list'
import List2 from './components/list2'
import List3 from './components/list3'
import { getList } from '@/api/table'

export default {
  // name: 'EchartDemo',
  components: {
    LineChart,
    PieChart,
    BarChart,
    RadarChart,
    rowBarChart,
    List,
    List2,
    List3
  },
  data() {
    return {
      otherHeight: 480, // 自适应高度
      loading: '', // 表格加载样式
      chooseDetails: '', // 选中栏数据
      pagination: { // 分页配置
        currentPage: 1, // 当前页
        page: 10, // 每页页数
        all: 100// 总页数
      },
      tableData: [], // 表格数据
      contentType: [
        {
          id: 1,
          prop: 'title',
          label: '标题',
          fixed: 'left'
        },
        {
          id: 2,
          prop: 'author',
          label: '名字',
          width: '100'
        },
        {
          id: 3,
          prop: 'display_time',
          label: '时间',
          width: '200',
          align: 'center'
        },
        {
          id: 4,
          prop: 'pageviews',
          label: '数量',
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
      getList(this.form, _pageNum, _pageSize).then(res => {
        this.tableData = res.data.list
        this.pagination.currentPage = res.data.pageNum
        this.pagination.page = res.data.pageSize
        this.pagination.all = res.data.total
        this.loading = false
      })
    },
    handleEdit(i, val) {
      if (val.edit) {
        val.edit = false
      } else {
        this.$set(val, 'edit', true)
      }
    }
    // // 获取选中栏数据
    // chooseChange(val) {
    //   this.chooseDetails = val
    // },
    // // 从分页组件获取当前页数请求数据
    // getCurrentData(val) {
    //   this.fetchData(val)
    // },
    // // 从分页组件获取当前页展示数据条数请求数据
    // getSize(val) {
    //   this.fetchData('', val)
    // },
    // // 清空查询
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // }
  }
}
</script>
<style lang="scss" scoped>
.other-info{
  .el-col{
    width: 20%;
    .white-box{
      height: 80px;
      position: relative;
      box-shadow:1px 1px 4px rgba(144, 156, 167, 0.5);
      &.one{
        background: linear-gradient(20deg, #e46b03, #ffd53a);
        box-shadow: 1px 1px 4px rgb(238, 146, 23);
        .icon{
          color:#f09a1c;
          border: 4px #ffd965 solid;
        }
      }
        &.two{
        background: linear-gradient(20deg, #078cbf, #77e0fb);
        box-shadow: 1px 1px 4px #41b8de;
        .icon{
          color:#3ab2da;
          border: 4px #b3ecff solid;
        }
      }
        &.thr{
        background: linear-gradient(20deg, #208eaf, #18e2a1);
        box-shadow: 1px 1px 4px rgba(63, 205, 210, 0.8);
        .icon{
          color:#1cb1a9;
          border: 4px #86eae3 solid;
        }
      }
        &.four{
        background: linear-gradient(20deg, #35b700, #deea1d);
        box-shadow: 1px 1px 4px rgb(120, 203, 11);
        .icon{
          color:#7ecd0d;
          border: 4px #b4f559 solid;
        }
      }
        &.five{
        background: linear-gradient(20deg, #1458a5, #58b6ec);
        box-shadow: 1px 1px 4px rgba(63, 147, 210,.8);
        .icon{
          color:#307fc2;
          border: 4px #a4d5ff solid;
        }
      }
      h1{
        position:absolute;
        right: 12px;
        top: 6px;
        height: 40px;
        margin: 0;
        color:#fff;
      }
      span{
        position: absolute;
        font-size: 14px;
        right: 12px;
        bottom: 10px;
        display: inline-block;
        width: 110px;
        text-align: right;
        line-height: 17px;
        color: #fff;
      }
      p{
        width: 100px;
        color: #4f5b6b;
        font-size: 12px;
        background-color: white;
        border-radius: 45px;
        height: 20px;
        position: absolute;
        bottom: 10px;
        right: 10px;
        text-align: center;
        line-height: 22px;
      }
      .icon{
        position: absolute;
        bottom: 16px;
        left: 18px;
        height: 50px;
        width: 50px;
        background-color: white;
        font-size: 30px;
        text-align: center;
        line-height: 40px;
        border-radius: 50px;
      }
    }
  }
}
.index-box{
  margin-top: 14px;
  h3{
    line-height: 16px;
    height: 26px;
    position: relative;
    &:after{
      content: '';
      display: inline-block;
      height: 2px;
      width: 100%;
      position: absolute;
      left: 0;
      top: 23px;
    }
    &.one:after{
      background-color: #5ca2ea;
    }
    &.two:after{
      background-color: #fad05d;
    }
    &.thr:after{
      background-color: #09d6b0;
    }
    i{
      cursor: pointer;
    }
  }
}
.table-box{
  position: relative;
  .line{
    position: absolute;
    top: 38px;
    left: 0;
    z-index: 6;
    height: 2px;
    width: 100%;
    background-color: #0e8ce4;
    border-radius: 100px;
  }
}
</style>

