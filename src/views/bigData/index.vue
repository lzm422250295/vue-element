<template>
  <div>
    <div @click="show=true">2020-3-31</div>
    <Data1 v-if="show" />
  </div>
</template>
<script>
import Data1 from './components/data1'
export default {
  components: {
    Data1
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
