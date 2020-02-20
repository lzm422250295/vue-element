<template>
  <div>
    <el-row class="white-box">
      <el-col :span="24">
        <el-form
          ref="msgForm"
          :model="msgData"
          :style="allHeight"
          class="form-padding"
          label-width="110px"
        >
          <el-row>
            <el-divider content-position="left"><span class="col-b fb">基本信息</span></el-divider>
            <el-col :span="8">
              <el-form-item label="用户名：">
                <span>{{ msgData.username }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名：">
                <span>{{ msgData.truename }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：">
                <span>{{ msgData.sexStr }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="启用状态：">
                <span>{{ msgData.status }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属部门：">
                <span>{{ msgData.orgName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职务：">
                <span>{{ msgData.jobTitle }}</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="是否执法人员：">
                <span>{{ msgData.isSupervisor }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执法证号：">
                <span>{{ msgData.lawEnforceNo }}</span>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="电话号码：">
                <span>{{ msgData.telephone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码：">
                <span>{{ msgData.mphone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址：">
                <span>{{ msgData.address }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮政编码：">
                <span>{{ msgData.postcode }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="用户角色：">
                <span><el-tag v-for="(item, index) in msgData.roleName" :key="index" size="medium">{{ item }}</el-tag></span>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="备注：">
                <span>{{ msgData.remark }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-divider content-position="left"><span class="col-b fb">账号相关</span></el-divider>
            <el-col :span="8">
              <el-form-item label="登录次数：">
                <span>{{ msgData.logonNumb }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最后登录时间：">
                <span>{{ msgData.lastLogonTime }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="密码修改日期：">
                <span>{{ msgData.pwdModifyTime }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <span>{{ msgData.createTime }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人：">
                <span>{{ msgData.createUser }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="锁定时间：">
                <span>{{ msgData.userLockTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="right">
            <el-button type="warning" size="medium" @click="isShowPS=true">修改密码</el-button>
          </el-divider>
        </el-form>
      </el-col>
    </el-row>
    <ChangePassword :is-show="isShowPS" @close="isShowPS=false" />
  </div>
</template>
<script>
import { getUserMsg } from '@/api/system/myMsg'
import { getToken } from '@/utils/auth'
// import { formatDate } from '@/utils/dataFormat.js'
import ChangePassword from '@/components/ChangePassword/index'
export default {
  name: 'MyMsg',
  components: {
    ChangePassword
  },
  filters: {
    formatDate(time) {
      // return formatDate(time)
    }
  },
  data() {
    return {
      isShowPS: false,
      allHeight: '',
      msgData: {}
    }
  },
  mounted() {
    this.fetchData()
    this.allHeight = 'height:' + (document.body.clientHeight - 138) + 'px'
  },
  methods: {
    // 获取数据
    fetchData() {
      const userId = getToken()
      getUserMsg(userId).then(res => {
        // if (res.data.roleName) {
        //   res.data.roleName = res.data.roleName.split(',')
        // }
        this.msgData = res.data
      })
    }
  }
}
</script>
<style lang="scss">
.form-padding {
  .el-tag{
    margin-right: 12px
  }
  padding:0px 20px;
  height:100%;
  .el-form-item__label{
    text-align: left !important;
    color: #999;
    font-weight: normal
  }
}
</style>
