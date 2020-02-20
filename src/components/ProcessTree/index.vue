<template>
  <div v-if="data.length>0" class="processTree">
    <ul class="layer2">
      <li v-for="(li,index) in data" :key="li.id+index" :style="`width:${190*li.all}px`">
        <span :class="[li.children.length!==0?'hasChild':'',isFirst?'':'span',li.type === '32'?'t1':(li.type==='31'?'t2':'t3')]">
          <!-- <el-popover
                placement="right"
                width="450"
                trigger="hover"
                :title="li.tit"
              >
                <div class="tipDiv"><span>溯源码：</span><span class="fr">{{ li.data.traceCode }}</span></div>
                <div class="tipDiv"><span>企业编号:</span><span class="fr">{{ li.data.compCode }}</span></div>
                <div class="tipDiv"><span>最后一次溯源时间:</span><span class="fr">{{ li.data.createTime }}</span></div>
                <div v-if="li.data.imgs.length>0" class="tipDiv"><span>凭证：</span><span class="fr">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="`${li.data.imgs[0]}`"
                    :preview-src-list="li.data.imgs"
                  />
                </span></div> -->
          <em slot="reference">{{ li.tit }}</em>
          <!-- </el-popover> -->

          <!-- <el-popover
                placement="right"
                width="310"
                trigger="hover"
              >
                <div>
                  <el-row>
                    <el-col :span="4"><span class="col-g fb">入库:</span></el-col>
                    <el-col :span="20">
                      <ul class="outIn">
                        <li v-for="item in li.inList" :key="item.inTime">
                          <strong style="width:80px;display: inline-block;"><i class="el-icon-takeaway-box" /> {{ item.inCount }}</strong>
                          <strong><i class="el-icon-time" /> {{ item.inTime }}</strong>
                        </li>
                      </ul>
                    </el-col>
                  </el-row>
                  <el-divider />
                  <el-row>
                    <el-col :span="4"><span class="col-r fb">出库:</span></el-col>
                    <el-col :span="20">
                      <ul class="outIn">
                        <li v-for="item in li.outList" :key="item.outTime">
                          <strong style="width:80px;display: inline-block;"><i class="el-icon-takeaway-box" /> {{ item.outCount }}</strong>
                          <strong><i class="el-icon-time" /> {{ item.outTime }}</strong>
                        </li>
                      </ul>
                    </el-col>
                  </el-row>
                </div>
                <div slot="reference">
                  <div class="circle" :style="`width:${String(li.inSum).length*11}px;margin-left:${-String(li.inSum).length*5.5}px`">{{ li.inSum }}</div>
                  <div v-if="li.children.length>0" class="circle2" :style="`width:${String(li.outSum).length*11}px;margin-left:${-String(li.outSum).length*5.5}px`">{{ li.outSum }}</div>
                </div>
              </el-popover> -->

          <div v-if="isFirst===false&&index===0" class="line" :style="`width:${190*li.all/2+95+(data.length<=2?0:(data.length-2))*190}px`" />
        </span>
        <ProcessTree v-if="li.children.length!==0" :data="li.children" :is-first="false" />
      </li>
      <!-- {160*li.all/2+80+(data.num<=2?0:(data.num-2))*160} -->

    </ul>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ProcessTree',
  props: {
    data: {
      type: Array,
      default() {
        return
      }
    },
    isFirst: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.outIn{
  list-style: none;
  li:not(:last-child){
    margin-bottom: 12px;
  }
}
.tipDiv{
  margin-bottom: 5px;
  span{
    color: #8390a2;
  }
  .fr{
    color: #3a414b;
  }
}
.processTree{
  padding: 10px;
  width: 100%;
  .processTreeLayer{
    div{
      margin-bottom: 5px;
    }
  }
  ul{
    list-style: none;
    text-align: center;
    &>li{
      &:first-child{
        &>.span{
          &>.line{
            margin-left: 0px;
          }
        }
      }
      &:last-child{
        &>.span{
          &>.line{
            margin-left: -190px;
          }
        }
      }
    }
  }

  span{
    text-align: center;
    display: inline-block;
    margin: 0 10px;
    border-radius: 4px;
    width: 160px;
    height: 30px;
    position: relative;
    color: white;
    em{
      font-style: normal;
      width: 100%;
      padding:0 5px;
      line-height: 28px;
      display: inline-block;
      white-space: nowrap;      /*超出的空白区域不换行*/
      overflow: hidden;         /*超出隐藏*/
      text-overflow: ellipsis;
    }
    .line{
      height: 1px;
      position: absolute;
      top: -31px;
      left: 50%;
      margin-left: 0;
      background-color: #999;
    }
    .circle{
      position: absolute;
      top: -22px;
      left: 50%;
      height: 18px;
      font-size: 12px;
      font-weight: 900;
      width: 100px;
      border-radius: 4px;
      margin-left: -7px;
      background-color: #f3be0e;
      background-image: linear-gradient(#fdc407,#f39402);
      box-shadow: 1px 1px 2px #f39402;
      z-index: 1;
    }
    .circle2{
      position: absolute;
      bottom: -22px;
      left: 50%;
      height: 18px;
      font-size: 12px;
      font-weight: 900;
      width: 100px;
      border-radius: 4px;
      margin-left: -7px;
      background-color: #b16fcf;
      background-image: linear-gradient(#b16fcf,#8b4ba8);
      box-shadow: 1px 1px 2px #b16fcf;
      z-index: 1;
    }
    &.span{
      &:after{
        content: '';
        display: inline-block;
        position: absolute;
        top: -31px;
        left: 50%;
        width: 1px;
        height: 30px;
        background-color: #999;
      }
    }
  }
  .hasChild{
    &:before{
      content: '';
      display: inline-block;
      position: absolute;
      top: 29px;
      left: 50%;
      width: 1px;
      height: 30px;
      background-color: #999;
    }
  }
  li{
    display: inline-block;
    position: relative;
    text-align: center;
  }
  .layer1{
    height:500px;
    &>li{
      width: 100%;
        &>.span{
          &:after{
          display: none
        }
      }
    }
  }
  .layer2,
  .layer3,
  .layer4,
  .layer5{
    height: 100px;
    position: absolute;
    left: 0;
    top: 90px;
  }
.t1{
  background-color: #13c38f;
  border: 1px solid #059080;
  box-shadow: 1px 1px 5px #56cfa1;
}
.t2{
  background-color: #358ad0;
  border: 1px solid #0e5fa0;
  box-shadow: 1px 1px 5px #67aae2;
}
.t3{
  background-color: #afbdd0;
  border: 1px solid #8295a5;
  box-shadow: 1px 1px 5px #8798a5;
}
}
</style>
