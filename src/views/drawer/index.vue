<template>
  <div>
    <el-button @click="drawerShow=true">显示抽屉</el-button>
    <!-- 抽屉 1 -->
    <Drawer :is-show.sync="drawerShow" :width="1000">
      <!-- 抽屉内容 -->
      <el-button size="medium" type="primary" @click="aa=true">
        显示更多
      </el-button>
      <!-- 抽屉操作 -->
      <template slot="btns">
        <el-button size="medium" type="primary">其他操作</el-button>
      </template>
    </Drawer>

    <!-- 抽屉 2-->
    <Drawer :is-show.sync="aa" :width="800" :need-confirm="true">
      <!-- 抽屉操作 -->
      <template v-slot:btns>
        1
      </template>
    </Drawer>

  </div>
</template>
<script>
import Drawer from '@/components/Drawer'

export default {
  name: 'DrawerDemo',
  components: {
    Drawer
  },
  data() {
    return {
      drawerShow: false,
      aa: false
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

