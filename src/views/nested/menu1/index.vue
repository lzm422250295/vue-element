<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1">
      <input v-model="aa">
      <router-view />
    </el-alert>
  </div>
</template>
<script>
export default {
  name: 'Menu1',
  data() {
    return {
      aa: 1
    }
  }
}
</script>
