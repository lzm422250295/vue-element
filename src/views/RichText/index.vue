<template>
  <div>
    <div class="showCont" v-html="data" />
    <Tinymce ref="Tinymce" @input="getContent()" />
    <!-- <el-form ref="form" :model="form" size="mini" label-width="70px" class="white-box">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item v-for="li in list" :key="li.node" :label="li.label" :prop="li.node">
            <el-input v-model="form[li.node]" placeholder="请输入关键字" />
          </el-form-item>
        </el-col>
      </el-row></el-form> -->
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'RichText',
  components: {
    Tinymce
  },
  data() {
    return {
      data: ''
    }
  },
  methods: {
    getContent() {
      this.data = this.$refs.Tinymce.getContent()
    }
  }
}
</script>
<style lang="scss" scoped>
.showCont{
  width: 100%;
  background-color: white;
  border-radius: 4px;
  border:1px #ccc solid;
  min-height: 100px;
  margin-bottom:12px;
  padding: 10px 30px;
}
</style>

