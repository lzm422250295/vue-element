<template>
  <div style="padding:15px;">
    <Upload
      ref="upload"
      :no-click="true"
      :the-id="{}"
    />
  </div>
</template>
<script>
import Upload from '@/components/Upload/index'

export default {
  neme: 'Upload',
  components: {
    Upload
  },
  data() {
    return {
    }
  }
}
</script>
