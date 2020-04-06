<template>
  <div>
    <el-upload
      ref="imgBroadcastUpload"
      :auto-upload="false"
      multiple
      list-type="picture-card"
      :on-change="imgBroadcastChange"
      accept="image/jpg,image/png,image/jpeg"
      action=""
    >
      <i class="el-icon-plus" />
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
    </el-upload>
    <el-button @click="exportZip()">submitData</el-button>
  </div>
</template>
<script>
// https://blog.csdn.net/pow8368684/article/details/78859921
import request from '@/utils/request'
import JSZip from 'jszip'
// import { saveAs } from 'file-saver'
export default {
  name: 'ImgUpload',
  data() {
    return {
      imgList: []
    }
  },
  methods: {
    // 图片选择后 保存在 imgList  对象中
    imgBroadcastChange(file, fileList) {
      this.imgList.push({
        url: file.url,
        name: file.name
      })
    },
    async getUrlBase64(url, ext) {
      return new Promise((resolve, reject) => {
        var canvas = document.createElement('canvas') // 创建canvas DOM元素
        var ctx = canvas.getContext('2d')
        var img = new Image()
        img.crossOrigin = 'Anonymous' // 处理跨域
        img.src = url
        img.onload = () => {
          canvas.width = img.width // 指定画板的高度,自定义
          canvas.height = img.height // 指定画板的宽度，自定义
          ctx.drawImage(img, 0, 0) // 参数可自定义
          var dataURL = canvas.toDataURL('image/' + ext)
          resolve(dataURL) // 回调函数获取Base64编码
          canvas = null
        }
      })
    },
    async exportZip() {
      const imgList = this.imgList
      const proList = []
      const zip = new JSZip()
      const cache = {}
      await imgList.forEach(item => { // 等待所有图片转换完成
        const pro = this.getUrlBase64(item.url, '.jpg').then(base64 => {
          // const fileName = item.url.replace(/(.*\/)*([^.]+)/i, '$2')
          zip.file(item.name, base64.substring(base64.indexOf(',') + 1), {
            base64: true
          })
          cache[item.name] = base64
        })
        proList.push(pro)
      })
      Promise.all(proList).then(res => {
        zip.generateAsync({
          type: 'blob'
        }).then(cont => {
          const files = new File([cont], 'uploadPics.zip', { type: 'zip' })
          const param = new FormData() // 创建form对象
          param.append('zipFile', files)// 通过append向form对象添加数据
          request({
            url: '/api/dcmMinioPicUpload/avatarSetting',
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: param
          }).then(() => {
            // param.onSuccess()
          })
          // saveAs(cont, 'images.zip') // 利用file-saver保存文件
        })
      })
    }
  }
}
</script>
