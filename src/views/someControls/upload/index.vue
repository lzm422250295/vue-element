<template>
  <div style="padding:15px;">
    <Upload
      ref="upload"
      :no-click="true"
      :the-id="{}"
    />
    <el-divider />
    <AutoUp
      ref="upload2"
      list-type="picture-card"
      :the-id="{}"
    />
  </div>
</template>
<script>
import Upload from '@/components/Upload/index'
import AutoUp from '@/components/Upload/autoUp'

export default {
  neme: 'Upload',
  components: {
    Upload,
    AutoUp
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
