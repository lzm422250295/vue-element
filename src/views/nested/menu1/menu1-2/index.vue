<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-2" type="success">
      <input v-model="bbb">
      <router-view />
    </el-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bbb: 1
    }
  }
}
</script>
