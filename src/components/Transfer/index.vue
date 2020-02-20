<template>
  <div class="transfer">
    <div class="left fl">
      <h4>{{ title[0] }} <el-button icon="el-icon-check" class="fr" size="mini" :class="{active:isAll}" circle @click.stop="chooseAll('left')" /></h4>
      <ul>
        <vue-scroll>
          <transition-group name="fade-transform">
            <li v-for="(li,index) in data" :key="li.key" :class="{active: li.active}" @click.stop="choose(data,index)">
              <div :title="li.label">{{ li.label }}</div>
            </li>
          </transition-group>
        </vue-scroll>
      </ul>
    </div>
    <div class="operation fl">
      <el-button type="primary" icon="el-icon-caret-right" circle :disabled="!(isActive)" @click="goRig" />
      <el-button type="primary" icon="el-icon-caret-left" circle :disabled="!(isActive2)" @click="goLeft" />
    </div>
    <div class="rig fr">
      <h4>{{ title[1] }} <el-button icon="el-icon-check" class="fr" size="mini" :class="{active:isAll2}" circle @click.stop="chooseAll('rig')" /></h4>
      <ul>
        <vue-scroll>
          <transition-group name="fade-transform">
            <li v-for="(li,index) in data2" :key="li.key" :class="{active: li.active}" @click.stop="choose(data2,index)">
              <div :title="li.label">{{ li.label }}</div>
              <el-button icon="el-icon-arrow-down" @click.stop="down(index)" />
              <el-button icon="el-icon-arrow-up" @click.stop="up(index)" />
            </li>
          </transition-group>
        </vue-scroll>
      </ul>
    </div>
    <div class="cb" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    option: { // 初始数据
      type: Array,
      default() {
        return []
      },
      required: true
    },
    choosed: { // 初始选中
      type: Array,
      default() {
        return []
      },
      required: true
    },
    type: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      data: [],
      data2: []
    }
  },
  computed: {
    isAll: function() {
      return this.data.every(el => {
        return el.active === true
      })
    },
    isAll2: function() {
      return this.data2.every(el => {
        return el.active === true
      })
    },
    isActive: function() {
      return this.data.some(el => {
        return el.active === true
      })
    },
    isActive2: function() {
      return this.data2.some(el => {
        return el.active === true
      })
    }
  },
  methods: {
    // 提交数据
    getData() {
      if (this.choosed.length === 0) {
        this.$message({
          message: `${this.title[0]}未选择`,
          type: 'warning'
        })
        return false
      }
      for (let i = 0; i < this.data2.length; i++) {
        this.data2[i].rowOrder = (i + 1)
        this.data2[i].columnType = this.type
      }
      return this.data2
    },
    // 生成数据
    creatData() {
      this.data = this.copyArr(this.option)
      this.data2 = []
      for (let i = 0; i < this.choosed.length; i++) {
        for (let index = 0; index < this.data.length; index++) {
          if (this.data[index].label === this.choosed[i]) {
            this.data2.push(this.copyArr(this.data[index]))
            this.data.splice(index, 1)
          }
        }
      }
    },
    // 数据深拷贝
    copyArr(object) {
      if (object.length === 0) return []
      let obj = {}
      obj = JSON.parse(JSON.stringify(object))
      return obj
    },
    choose(data, i) {
      if (data[i].active) {
        data[i].active = false
      } else {
        this.$set(data[i], 'active', true)
      }
    },
    chooseAll(type) {
      if (type === 'left') {
        if (this.isAll) {
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].active = false
          }
        } else {
          for (let i = 0; i < this.data.length; i++) {
            this.$set(this.data[i], 'active', true)
          }
        }
      } else {
        if (this.isAll2) {
          for (let i = 0; i < this.data2.length; i++) {
            this.data2[i].active = false
          }
        } else {
          for (let i = 0; i < this.data2.length; i++) {
            this.$set(this.data2[i], 'active', true)
          }
        }
      }
    },
    goRig() {
      for (let i = this.data.length - 1; i >= 0; i--) {
        if (this.data[i].active) {
          this.choosed.push(this.data[i].label)
          this.data[i].active = false
          this.data2.unshift(this.copyArr(this.data[i]))
          this.data.splice(i, 1)
        }
      }
    },
    goLeft() {
      for (let i = this.data2.length - 1; i >= 0; i--) {
        if (this.data2[i].active) {
          this.choosed.splice(i, 1)
          this.data2[i].active = false
          this.data.unshift(this.copyArr(this.data2[i]))
          this.data2.splice(i, 1)
        }
      }
    },
    down(i) {
      if ((i + 1) === this.choosed.length) {
        this.$message({
          message: '已经是最后一条',
          type: 'warning'
        })
        return
      }
      const obj = this.data2[i]
      const obj2 = this.data2[i + 1]
      this.data2.splice(i, 2, obj2, obj)
    },
    up(i) {
      if (i === 0) {
        this.$message({
          message: '已经是第一条',
          type: 'warning'
        })
        return
      }
      const obj = this.data2[i - 1]
      const obj2 = this.data2[i]
      this.data2.splice(i - 1, 2, obj2, obj)
    }
  }
}
</script>
<style lang="scss">
.transfer{
  width: 100%;
  .left,
  .rig{
    border-radius: 4px;
    border: 1px #ccc solid;
    width: 44%;
    h4{
      background-color: #e3e8f1;
      border-top-left-radius:4px;
      border-top-right-radius: 4px;
      padding: 0 8px;
      height: 35px;
      line-height: 35px;
      border-bottom: 1px #ccc solid;
      .fr{
        padding: 4px;
        margin: 5px 0 0 0;
        &.active{
          background-color: #007ed6;
          color: #fff;
          border-color: #007ed6;
          font-weight: bold;
          box-shadow: 1px 1px 3px rgba(38, 135, 255, 0.7);
        }
      }
    }
    ul{
      padding: 0 0 0 10px;
      height: 300px;
      li{
        height: 37px;
        padding:7px 4px;
        cursor: pointer;
        transition: all .3s;
        border-radius: 4px;
        &:hover{
          background-color: #f5f7fa;
        }
        &.active{
          div{
            background-color: #007ed6;
            color: #fff;
            border-color: #007ed6;
            font-weight: bold;
            box-shadow: 1px 1px 3px rgba(38, 135, 255, 0.7);
            border-radius: 4px;
          }
        }
        div{
          max-width: 65%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          transition: all .3s;
          display: inline-block;
          padding:2px 5px;
        }
      }
    }
  }
  .rig{
    .el-button{
      padding:3px;
      float: right;
      margin: 0 5px;
    }
  }
  .operation{
    width:12%;
    text-align: center;
    padding-top:50px;
    .el-button{
      margin: 10px;
      padding: 4px;
      box-shadow: 1px 1px 5px rgba(38, 135, 255, 0.8);
      i{
        font-size: 22px;
      }
    }
  }
}
</style>
