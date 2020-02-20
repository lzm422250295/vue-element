<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-1" type="success">
      <input v-model="ccc">
      <router-view />
    </el-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ccc: 1
    }
  }
}
</script>
