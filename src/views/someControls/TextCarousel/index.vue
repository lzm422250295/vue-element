<template>
  <div>
    <TextCarousel :list="data" :height="50" :speed="2" />
  </div>
</template>

<script>
import TextCarousel from '@/components/TextCarousel'
export default {
  components: {
    TextCarousel
  },
  data() {
    return {
      data: [
        {
          data: '第一条',
          time: '202011-11',
          id: '1'
        }, {
          data: '第二条',
          time: '202011-11',
          id: '2'
        }, {
          data: '第三条',
          time: '202011-11',
          id: '3'
        }
      ]
    }
  }
}
</script>

<style>

</style>
