<template>
  <div class="pr">
    <el-upload
      ref="upload"
      :class="noClick?'noClick':''"
      :data="theId"
      :on-preview="open"
      :on-success="success"
      :before-remove="beforeRemove"
      :file-list="file"
      :action="action"
      :list-type="listType"
      :on-error="error"
      :before-upload="beforeUpload"
      :disabled="readonly"
      :multiple="multiple"
      :headers="headers"
      :auto-upload="false"
      :http-request="upFun"
    >

      <template v-if="!readonly">
        <i slot="trigger" class="el-icon-plus" />
        <div slot="tip" class="el-upload__tip"><el-button size="mini" type="primary" @click="submitUpload">上传选择的图片</el-button></div>
      </template>

    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
// import {
//   getToken,
//   getTenant
// } from '@/utils/auth'
export default {
  name: 'Upload',
  props: {
    headers: {
      type: Object,
      default() {
        return {
          // Authorization: getToken(),
          // 'X-Tenant-Auth': getTenant()
        }
      }
    },
    btnName: {
      type: String,
      default() {
        return '上传附件'
      }
    },
    canUp: {// 是否只读
      type: Boolean,
      default() {
        return false
      }
    },
    readonly: {// 是否只读
      type: Boolean,
      default() {
        return false
      }
    },
    noClick: {// 是否禁用点击
      type: Boolean,
      default() {
        return false
      }
    },
    multiple: {// 是否多选
      type: Boolean,
      default() {
        return true
      }
    },
    autoUp: {// 是否多选
      type: Boolean,
      default() {
        return false
      }
    },
    listType: { // 文件列表的类型 text/picture/picture-card
      type: String,
      default() {
        return 'text'
      }
    },
    theId: { // 上传时附带的额外参数
      type: Object,
      default() {
        return
      }
    },
    action: {// 上传接口
      type: String,
      default() {
        return 'https://jsonplaceholder.typicode.com/posts/'
        // return '/netfs/upload/uploadTemplate'
      }
    },
    delAction: {// 删除接口
      type: String,
      default() {
        return '/api/TraceCodeManage/delFileOth'
      }
    },
    fileSize: { // 上传的文件大小限制
      type: Number,
      default() {
        return 100
      }
    },
    fileType: { // 文件列表的类型
      type: Array,
      default() {
        return ['rar', 'zip', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'ppt', 'jpg', 'jpeg', 'png', 'avi', 'rmvb', 'rm', 'asf', 'wmv', 'mp4', '3gp', 'mkv', 'wav', 'mp3', 'wma', 'ra', 'amr', 'm4a']
      }
    },
    fileId: { // 根据ID获取文件
      type: String,
      default() {
        return
      }
    },
    fieldNameType: { // 根据模块类型获取文件
      type: String,
      default() {
        return ''
      }
    },
    fileNum: {// 文件数量-用以判断是否请求
      type: String,
      default() {
        return
      }
    }
  },
  data: function() {
    return {
      file: [], // 上传文件相关数据
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  watch: {
    'theId.id': function() {
      this.getfiles()
    }
  },
  mounted() {
    this.getfiles()
  },
  methods: {
    upFun(param) {
      param.onSuccess()
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    // 请求文件
    getfiles() {
      if (this.fileNum !== '0' && this.theId.id) {
        request({
          url: '/upload/getFileOth',
          method: 'post',
          data: {
            id: this.theId.id,
            fieldName: this.fieldNameType
          }
        }).then(res => {
          this.file = res.data
        })
      }
    },
    // 下载
    downloads(data, name) {
      const link = document.createElement('a')
      link.href = `/yjcds/upload${data}`
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    open(file) {
      if (this.noClick) return
      if (this.listType === 'picture-card') {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
        return
      }
      if (file.url) {
        this.downloads(file.url, file.name)
      } else {
        this.downloads(file.response.data.url, file.name)
      }
    },
    success(response, file, fileList) {
      if (response.code === 500) {
        if (response.message) {
          this.$message({
            message: response.message,
            type: 'warning'
          })
        }
      } else {
        if (response.message) {
          this.$message({
            message: response.message,
            type: 'success'
          })
        }
      }
      this.$emit('success', response.data, file, fileList)
    },
    beforeUpload(file) {
      const type = file.name.substring(file.name.lastIndexOf('.') + 1)// 文件类型限制
      const isType = this.fileType.some(function(el) {
        return el === type
      })
      if (!isType) {
        this.$message({
          message: '不允许的文件格式',
          type: 'warning'
        })
        return isType
      }

      const isSize = file.size / 1024 / 1024 < this.fileSize // 文件大小限制
      if (!isSize) {
        this.$message({
          message: `上传文件大小不能超过${this.fileSize}M`,
          type: 'warning'
        })
        return isSize
      }
    },
    error(err, file, fileList) {
      const msg = JSON.parse(err.message).message
      this.$message({
        message: msg,
        dangerouslyUseHTMLString: true,
        type: 'error',
        showClose: true,
        duration: 0
      })
    },
    delFile(fileUrl) {
      request({
        url: '/upload/delFileNotWarn', // 删除接口
        method: 'post',
        data: {
          ...fileUrl
        }
      })
    },
    beforeRemove(file, fileList) {
      if (file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (file.response) {
            return request({
              url: this.delAction, // 删除接口
              method: 'post',
              data: {
                ...file.response.data
              }
            }).then(() => {
              this.$emit('delSuccess', file.response.data.path)
            })
          } else {
            return request({
              url: this.delAction, // 删除接口
              method: 'post',
              data: {
                url: file.url
              }
            }).then(() => {
              this.$emit('delSuccess')
            })
          }
        })
      } else {
        return true
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    }
  }
}
</script>
<style lang="scss">
.aa{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.el-icon-circle-check:before {
    content: "\e720";
}
.noClick{
  .el-upload-list__item-name{
    cursor:default !important;
  }
}
.uploadInfo{
  position: absolute;
  right: -13px;
  top: -7px;
  height: 20px;
  width: 20px;
  padding: 0 !important;
  z-index: 1;
  border:0;
  background-color: transparent;
  &:hover{
    opacity: 1;
    border:0;
    background-color: transparent;
  }
  i{
    font-size:20px;
    color:rgb(255, 176, 29);
  }
}
</style>
