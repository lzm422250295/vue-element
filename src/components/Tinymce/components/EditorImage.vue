<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" @click=" dialogVisible=true">
      本地上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" title="上传图片">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :action="action"
        class="editor-slide-upload"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button size="small" class="fr" style="margin-left:10px;" @click="close">
        取消
      </el-button>
      <el-button size="small" class="fr" type="primary" @click="handleSubmit">
        确定
      </el-button>
      <span class="col-r">*</span> 仅支持上传 <span class="col-r">jpg , png</span> 的格式,且文件大小应小于 <span class="col-r">{{ fileSize }}M </span>的图片。
      <div class=" cb" />
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'EditorSlideUpload',
  props: {
    action: {
      type: String,
      default() {
        return {
        }
      }
    },
    color: {
      type: String,
      default: '#1890ff'
    },
    fileSize: { // 上传的文件大小限制
      type: Number,
      default() {
        return 10
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    // 判断是否成功上传的方法
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    // 提交促发判断方法，关闭上传界面。清空数据
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图像成功上载。如果存在网络问题，请刷新页面并重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    // 上传成功钩子函数
    handleSuccess(response, file, fileList) {
      const uid = file.uid
      setTimeout(() => {
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0; i < objKeyArr.length; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = `/netfs/upload${response.data}`
            this.listObj[objKeyArr[i]].hasSuccess = true
            return
          }
        }
      }, 1000)
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const isType = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (!(isType === 'jpg' || isType === 'png')) {
        this.$message({
          message: '不允许的文件格式',
          type: 'warning'
        })
        return false
      }
      const isSize = file.size / 1024 / 1024 < this.fileSize // 这里做文件大小限制
      if (!isSize) {
        this.$message({
          message: `上传文件大小不能超过${this.fileSize}M`,
          type: 'warning'
        })
        return isSize
      }
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.name
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() { // *******与上传成功的钩子出现执行顺序上的问题，导致文件上传成功的参数为false
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    },
    close() {
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container{
  /deep/ .el-dialog__body{
    padding: 12px 20px;
    .editor-slide-upload {
      margin-bottom: 20px;
     .el-upload--picture-card {
        width: 100%;
      }
    }
  }
}
</style>
