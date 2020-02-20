<template>
  <div style="padding:20px;height:100%;">
    <vue-scroll>
      <div class="details">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>企业编码</td>
            <td>{{ details.compCode }}</td>
            <td>企业名称：</td>
            <td>{{ details.compName }}</td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>{{ details.truename }}</td>
            <td>电话号码</td>
            <td>{{ details.telephone }}</td>
          </tr>
          <tr>
            <td>手机号码</td>
            <td>{{ details.mphone }}</td>
            <td>密码修改方式</td>
            <td>{{ details.pwdModifyMode === '0' ? '自己修改' : '新建或被重置' }}</td>
          </tr>
          <tr>
            <td>启用状态</td>
            <td>{{ details.enableStatus === '1' ? '启用' : '停用' }}</td>
            <td>用户角色</td>
            <td>{{ details.roleName }}</td>
          </tr>
          <tr>
            <td>密码修改日期</td>
            <td>{{ details.pwModifyDate | formatDate }}</td>
            <td>最后登录时间</td>
            <td>{{ details.lastLogonTime | formatDate }}</td>
          </tr>
          <tr>
            <td>登录次数</td>
            <td>{{ details.logonNumb }}</td>
            <td>许可证号</td>
            <td>{{ details.issueCertCode }}</td>
          </tr>
          <tr>
            <td>创建人</td>
            <td>{{ details.createUser }}</td>
            <td>创建时间</td>
            <td>{{ details.createTime | formatDate }}</td>
          </tr>
          <tr>
            <td>最后更新人</td>
            <td>{{ details.lastModUser }}</td>
            <td>最后更新时间：</td>
            <td>{{ details.lastModTime | formatDate }}</td>
          </tr>
        </table>
      </div>
    </vue-scroll>
    <div class="drawer-btns">
      <el-button size="medium" @click="close()">关闭</el-button>
    </div>
  </div></template>

<script>
// import { formatDate } from '@/utils/dataFormat.js'
export default {
  name: 'Viwe',
  filters: {
    formatDate(time) {
      // return formatDate(time)
    }
  },
  props: {
    details: {
      type: Object,
      default() {
        return
      }
    },
    close: {
      type: Function,
      default() {
        return
      }
    }
  }
}
</script>
