<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-1" type="success">
      <input v-model="aaa">
      <router-view />
    </el-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aaa: 1
    }
  }
}
</script>
