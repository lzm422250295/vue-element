<template>
  <div class="bigData" style="height:100%">
    <img class="indexTit" src="/img/title.png">
    <el-row style="height:100%">
      <el-col class="left" :span="5" style="height:100%">
        <!-- <PieChart ref="pie" /> -->
        <ul class="cont-box" style="height:25%">
          <li>
            <p>公众号用户</p>
            <span>1544</span>
            <img src="/img/wx.png">
          </li>
          <li>
            <p>累计APP粉丝</p>
            <span>23544</span>
            <img src="/img/cumulative.png">
          </li>
          <li>
            <p>累计注册用户</p>
            <span>124544</span>
            <img src="/img/app.png">
          </li>
        </ul>
        <div class="cont-box2" style="height:24%">
          <h4 class="cont-tit"><img src="/img/titBg.png"><span>本月销售区域榜Top5（笔）</span></h4>
          <ul>
            <li>
              <span class="fl tit">厦门</span>
              <div class="numChart fl">
                <em :style="`width:60%`" />
              </div>
              <span class="num">{{ 2500 }}</span>
            </li>
            <li>
              <span class="fl tit">北京</span>
              <div class="numChart fl">
                <em :style="`width:40%`" />
              </div>
              <span class="num">{{ 1500 }}</span>
            </li>
            <li>
              <span class="fl tit">上海</span>
              <div class="numChart fl">
                <em :style="`width:30%`" />
              </div>
              <span class="num">{{ 900 }}</span>
            </li>
            <li>
              <span class="fl tit">广东</span>
              <div class="numChart fl">
                <em :style="`width:20%`" />
              </div>
              <span class="num">{{ 500 }}</span>
            </li>
            <li>
              <span class="fl tit">深圳</span>
              <div class="numChart fl">
                <em :style="`width:10%`" />
              </div>
              <span class="num">{{ 200 }}</span>
            </li>
          </ul>
          <!-- <MonSaleChart ref="bar" style="height:100%" /> -->
        </div>
        <div class="cont-box3" style="height:24%">
          <h4 class="cont-tit"><img src="/img/titBg.png"><span>本月城市销售榜Top5（笔）</span></h4>
          <ul>
            <li>
              <span class="fl tit">厦门</span>
              <div class="numChart fl">
                <em :style="`width:60%`" />
              </div>
              <span class="num">{{ 2500 }}</span>
            </li>
            <li>
              <span class="fl tit">北京</span>
              <div class="numChart fl">
                <em :style="`width:40%`" />
              </div>
              <span class="num">{{ 1500 }}</span>
            </li>
            <li>
              <span class="fl tit">上海</span>
              <div class="numChart fl">
                <em :style="`width:30%`" />
              </div>
              <span class="num">{{ 900 }}</span>
            </li>
            <li>
              <span class="fl tit">广东</span>
              <div class="numChart fl">
                <em :style="`width:20%`" />
              </div>
              <span class="num">{{ 500 }}</span>
            </li>
            <li>
              <span class="fl tit">深圳</span>
              <div class="numChart fl">
                <em :style="`width:10%`" />
              </div>
              <span class="num">{{ 200 }}</span>
            </li>
          </ul>
          <!-- <RowBarChart ref="bar" style="height:100%" /> -->
        </div>
        <div class="cont-chart" style="height:27%">
          <h4 class="cont-tit"><img src="/img/titBg.png"><span>本月产品销售情况</span></h4>
          <MonSaleChart ref="bar" style="height:100%" />
        </div>
      </el-col>

      <el-col :span="19" style="height:100%">
        <el-col :span="17" style="height:100%">
          <el-row style="height:72%">
            <div class="todayBuy">
              <p>今日订单</p>
              <span>43301</span>
            </div>
            <MapChart style="height:90%;margin-top:10%" @getAllData="getAllData" />
          </el-row>
          <el-row class="pr" style="height:27%">
            <h4 class="cont-tit"><img src="/img/titBg.png"><span>用户增长量</span></h4>
            <userAddNum ref="bar" style="height:100%" />
          </el-row>
        </el-col>
        <el-col class="right" :span="7" style="height:100%">
          <div class="cont-box" style="height:25%">
            <ul>
              <li>
                <span class="tit">今日访问数(UV)</span>
                <p>{{ 5521 }}</p><strong class="col-r fb"><i class="el-icon-caret-top" />60%</strong>
              </li>
              <li>
                <span class="tit">今日浏览量(PV)</span>
                <p>{{ 15131 }}</p><strong class="col-g fb"><i class="el-icon-caret-bottom" />60%</strong>
              </li>
              <li>
                <span class="tit">今日登录会员</span>
                <p>{{ 4521 }}</p><strong class="col-g"><i class="el-icon-caret-bottom" />60%</strong>
              </li>
              <li>
                <span class="tit">今日注册会员</span>
                <p>{{ 1521 }}</p><strong class="col-r"><i class="el-icon-caret-top" />60%</strong>
              </li>
            </ul>
          </div>
          <div class="pr" style="height:35%">
            <h4 class="cont-tit"><img src="/img/titBg.png"><span>用户画像</span></h4>
            <UserPic ref="bar" style="height:80%" />
            <div style="height: 50px">
              <div class="suc-fail">
                <em :style="`width:${40}%`" class="success"><span style="left:10px">男：{{ 20 }}</span></em>
                <em :style="`width:${60}%`" class="fail"><span style="right:10px">女：{{ 50 }}</span></em>
              </div>
            </div>
            <!-- <MonSaleChart ref="bar" style="height:100%" /> -->
          </div>
          <div class="pr" style="height:40%">
            <h4 class="cont-tit"><img src="/img/titBg.png"><span>数据转化漏斗模型</span></h4>
            <Funnel ref="funnel" style="height:100%" />
          </div>
        </el-col>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// import RowBarChartDra from './components/chartDrawer/rowBarChartDra'
// import Drawer from '@/components/Drawer/index'
import MapChart from './components/mapChart'
// import PieChart from './components/pieChart'
import Funnel from './components/funnel'
import MonSaleChart from './components/monSaleChart'
import UserPic from './components/userPic'
import userAddNum from './components/userAddNum'
// import BarChart from './components/barChart'
// import RowBarChart from './components/rowBarChart'
// import { getRecentData } from '@/api/chart'

export default {
  name: 'Index',
  components: {
    // PieChart,
    MonSaleChart,
    userAddNum,
    MapChart,
    Funnel,
    UserPic
    // RowBarChart
    // Drawer,
    // RowBarChartDra
  },
  data() {
    return {
      orgid: '',
      RowBarTit: '',
      drawerLoading: false,
      tableName: '',
      drawerShow: false,
      dataSituation: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 关闭详情抽屉
    closeDrawer() {
      this.drawerShow = false
    },
    rowBarClick(val) {
      this.RowBarTit = val.data.tit
      this.tableName = val.data.tableName
      this.drawerShow = true
    },
    getData(id) {
      // getRecentData(id).then(res => {
      //   this.dataSituation = res.data
      // })
    },
    getAllData(val) {
      // this.orgid = String(val)
      // this.$refs.pie.getData(this.orgid)
      // this.$refs.rowBar.getData(this.orgid)
      // this.getData(this.orgid)
    }
  }
}
</script>
<style lang="scss" scoped>
.indexTit{
  position: fixed;
  width: 55%;
  margin-left: -28%;
  left: 50%;
  top: 12px;
}
.todayBuy{
  position: absolute;
  width: 500px;
  left: 50%;
  margin-left: -250px;
  top: 16%;
  text-align: center;
  p{
    color: rgb(216, 235, 252);
    font-size: 16px;
  }
  span{
    display: inline-block;
    margin-top: -12px;
    letter-spacing: 8px;
    font-weight: bold;
    font-size: 45px;
    color: white;
    text-shadow: 1px 1px 8px rgba($color: rgb(159, 216, 255), $alpha: .7);
  }
}
.suc-fail{
  width: 85%;
  height: 38px;
  position: relative;
  margin:20px;
  em{
    transition:all .4s;
    position: relative;
    margin: 2px 0;
    float: left;
    height: 24px;
    color: white;
    font-style: normal;
    font-size: 12px;
    padding: 0 8px;
    line-height: 24px;
    cursor: pointer;
    filter: saturate(1);
    &:hover{
      filter: saturate(1.6);
    }
    span{
      width: 100px;
      display: block;
      position: absolute;
      top: 0;
    }
  }
  .success{
    background-color: #24b8e6;
    background:linear-gradient(90deg, #025dbb, #0eefff);
    box-shadow: 0 0 12px rgba(41, 154, 230, 1);
    border-top-left-radius:18px ;
    border-bottom-left-radius:18px ;
    text-align: left;
  }
  .fail{
    background-color: #fc436b;
    background:linear-gradient(90deg, #ff6f93, #d01652);
    box-shadow: 0 0 12px rgb(250, 57, 115);
    border-top-right-radius:18px ;
    border-bottom-right-radius:18px ;
    text-align: right;
  }
}
.right{
  .cont-box{
    padding: 14px;
    position: relative;
    ul{
      height: 100%;
      li{
        position: relative;
        width: 44%;
        float: left;
        height: 42%;
        margin: 8px;
        padding:8px 10px;
        background-image: linear-gradient(0deg,rgba(255,255,255,0) 0%,rgba(143, 190, 221, 0.4) 100%);
        &:after{
          content: '';
          display: inline-block;
          background-color: #48bee6;
          height: 4px;
          width: 100%;
          position: absolute;
          left: 0;
          top: -2px;
          box-shadow: 1px 0 4px rgb(49, 183, 231);
        }
        span{
          color: #5fe8ff;
        }
        p{
          letter-spacing: 3px;
          font-weight: bold;
          font-size: 24px;
          color: white;
          text-shadow: 1px 1px 8px rgba($color: rgb(159, 216, 255), $alpha: .7);
        }
        strong{
          margin-left: 2px;
          padding: 2px 5px;
          border-radius: 4px;
          color: white !important;
          &.col-r{
            background-color: rgb(240, 40, 100);
          }
          &.col-g{
            background-color: #07a965;
          }
        }
      }
    }
  }
}
.bigData{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #134263;
  z-index: 1000;
  left: 0;
  top: 0;
  background: url("/img/bg.jpg") center center no-repeat;
  z-index: 9999;
  .cont-tit{
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 15px;
    color: white;
    margin-bottom: 8px;
    span{
      vertical-align: middle;
    }
    img{
      width: 26px;
      height: 16px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }

  .left{
    .cont-box,
    .cont-box2,
    .cont-box3,
    .cont-chart{
      padding: 14px;
      position: relative;
      ul{
        margin-top: 30px;
      }
    }
    // .cont-chart{
    //   position: relative;
    //   h4{
    //     position: absolute;
    //     top: 0;
    //     left: 12px;
    //     color: white;
    //   }
    //   img{
    //     width: 26px;
    //     height: 16px;
    //     margin-right: 10px;
    //     vertical-align: middle;
    //   }
    // }
    .cont-box2,
    .cont-box3{
      padding:12px 14px 0;
    }
    .cont-box{
      li{
        position: relative;
        padding:6px 16px;
        color: white;
        text-shadow: 1px 1px 8px rgba($color: rgb(159, 216, 255), $alpha: .7);
        height: 29%;
        // background-color: #134263;
        background-image: linear-gradient(270deg,rgba(255,255,255,0) 5%,rgba(143, 190, 221, 0.4) 100%);
        margin-bottom: 14px;
        &:after{
          content: '';
          display: inline-block;
          background-color: #48bee6;
          height: 100%;
          width: 4px;
          position: absolute;
          left: 0;
          top: 0;
          box-shadow: 1px 0 4px rgb(49, 183, 231);
        }
        p{
          color: #5fe8ff;
        }
        span{
          font-size:24px;
          font-weight: 700;
          margin-top: -7px;
          display: inline-block;
          letter-spacing:3px
        }
        img{
          position: absolute;
          right: 11px;
          top: 2px;
        }
      }
    }
    .cont-box2,
    .cont-box3{
      li{
        height: 25px;
      }
      .tit,
      .num{
        width: 20%;
        float: left;
        color:#98f0ff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .num{
        font-weight: 700;
        padding-left: 10px;
      }
      .numChart{
        margin: 4px 0;
        width: 58%;
        border: 1px #0eefff solid;
        background-color: rgba(87, 160, 236, 0.3);
        border-radius: 4px;
        height: 12px;
        float: left;
        padding: 0 2px;
        em{
          transition:all .5s;
          background-color: #0697f7;
          background:linear-gradient(90deg,#0697f7, #0eefff);
          height: 6px;
          border-radius: 4px;
          float: left;
          position: relative;
          margin: 2px 0;
        }
      }
    }
    .cont-box3{
      .tit,
      .num{
        color:#ffd16d;
      }
      .numChart{
        border: 1px #ffaf04 solid;
        background-color: rgba(247, 211, 51, 0.25);
        em{
          background:linear-gradient(90deg,#ffaf04, #fff236) ;
        }
      }
    }
  }
}
</style>

