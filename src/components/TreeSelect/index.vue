
<template>
  <div>
    <!-- 蒙版 -->
    <div v-show="isShowSelect" class="mask" @click="isShowSelect = !isShowSelect" />
    <!-- 弹框 -->
    <el-popover
      v-model="isShowSelect"
      :width="width"
      placement="bottom-start"
      trigger="manual"
      @hide="popoverHide"
    >
      <!-- 树 -->
      <el-tree
        ref="tree"
        :style="style"
        :data="data"
        :props="defaultProps"
        :show-checkbox="multiple"
        :node-key="nodeKey"
        :check-strictly="checkStrictly"
        :expand-on-click-node="false"
        :highlight-current="true"
        class="common-tree"
        default-expand-all
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
      />
      <!-- 选择框 -->
      <el-select
        slot="reference"
        ref="select"
        v-model="selectedData"
        :disabled="disabled"
        :style="selectStyle"
        :multiple="multiple"
        class="tree-select"
        @click.native="isShowSelect = !isShowSelect"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 树结构数据
    data: {
      type: Array,
      default() {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default() {
        return {}
      }
    },
    // 配置是否可多选
    multiple: {
      type: Boolean,
      default() {
        return false
      }
    },
    nodeKey: {
      type: String,
      default() {
        return 'id'
      }
    },
    // 显示复选框情况下，是否严格遵循父子不互相关联
    checkStrictly: {
      type: Boolean,
      default() {
        return false
      }
    },
    checkedKeys: {
      type: Array,
      default() {
        return []
      }
    },
    // 默认选中的节点key数组
    defaultCheckedKeys: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: Number,
      default() {
        return 350
      }
    },
    height: {
      type: Number,
      default() {
        return 350
      }
    }
  },
  data() {
    return {
      // defaultCheckedKeys: [],
      isShowSelect: false, // 是否显示树状选择器
      options: [],
      selectedData: [], // 选中的节点
      style: 'width:' + this.width + 'px;' + 'height:' + this.height + 'px;',
      selectStyle: 'width:' + (this.width + 24) + 'px;',
      checkedIds: [],
      checkedData: []
    }
  },
  watch: {
    isShowSelect(val) {
      // 隐藏select自带的下拉框
      this.$refs.select.blur()
    },
    // 监听默认值变化
    defaultCheckedKeys() {
      setTimeout(() => { // 异步操作，否则tree没有数据导致报错
        if (this.defaultCheckedKeys.length >= 0) {
          if (this.multiple) {
            this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)// 默认值填入选择框
            this.selectedData = this.defaultCheckedKeys.map((item) => {
              var node = this.$refs.tree.getNode(item)
              return node.label
            })
          } else {
            var item = this.checkedKeys[0]
            this.$refs.tree.setCurrentKey(item)
            var node = this.$refs.tree.getNode(item)
            this.selectedData = node.label
          }
          this.$emit('popoverHide', this.$refs.tree.getCheckedKeys())
        } else {
          this.$refs.tree.setCheckedKeys([]) // 清空选择框
        }
      }, 0)
    }
  },
  methods: {
    popoverHide() {
      if (this.multiple) {
        this.checkedIds = this.$refs.tree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
        this.checkedData = this.$refs.tree.getCheckedNodes() // 所有被选中的节点所组成的数组数据
      } else {
        this.checkedIds = this.$refs.tree.getCurrentKey()
        this.checkedData = this.$refs.tree.getCurrentNode()
      }
      this.$emit('popoverHide', this.checkedIds, this.checkedData)
    },
    // 节点被点击时的回调,返回被点击的节点数据
    handleNodeClick(data, node) {
      if (!this.multiple) {
        const tmpMap = {}
        tmpMap.value = node.key
        tmpMap.label = node.label
        this.options = []
        this.options.push(tmpMap)
        this.selectedData = node.label
        this.isShowSelect = !this.isShowSelect
      }
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange() {
      const checkedKeys = this.$refs.tree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
      this.options = checkedKeys.map((item) => {
        const node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
        const tmpMap = {}
        tmpMap.value = node.key
        tmpMap.label = node.label
        return tmpMap
      })
      this.selectedData = this.options.map((item) => {
        return item.label
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .common-tree{
    overflow: auto;
  }

</style>
<style>
  .el-select .el-select__tags{
    max-height: 250px;
    overflow-y:scroll;
  }
  .tree-select .el-select__tags .el-tag .el-tag__close{
    display: none;
  }
  .tree-select .el-select__tags .el-tag .el-icon-close{
    display: none;
  }
</style>

