<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1">
      <input v-model="bb">
      <router-view />
    </el-alert>
  </div>
</template>
<script>
export default {
  name: 'Laws',
  data() {
    return {
      bb: 1
    }
  }
}
</script>
