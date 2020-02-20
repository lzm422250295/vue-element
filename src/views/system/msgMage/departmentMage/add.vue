<template>
  <el-form
    ref="addForm"
    :rules="rules"
    :model="form"
    size="mini"
    style="padding:20px;height:100%;"
    label-width="140px"
  >
    <h3 class="drawer-tit">{{ tit }}</h3>
    <vue-scroll>
      <el-col :span="24">
        <el-form-item label="部门编号" prop="id">
          <el-input v-model="form.id" placeholder="请输入用户名(参考行政区划编码规则)" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="部门名称" prop="orgName">
          <el-input v-model="form.orgName" :maxlength="150" placeholder="请输入部门名称" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="上级部门" prop="parentIds">
          <el-cascader
            v-model="form.parentIds"
            :options="init.parentIdList"
            :show-all-levels="false"
            placeholder="请选择管辖部门"
            check-strictly
            clearable
            :props="{ expandTrigger: 'hover' }"
            readonly
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="部门类型" prop="orgType">
          <el-select v-model="form.orgType" clearable placeholder="请选择部门类型">
            <el-option
              v-for="item in orgTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-if="form.orgType!=='2'" :span="24">
        <el-form-item label="查看指定部门数据">
          <TreeSelect
            :data="init.dataRightDeptList"
            :default-props="defaultProps"
            :node-key="nodeKey"
            multiple
            @popoverHide="popoverHide"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入手机号码" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="邮政编码" prop="postcode">
          <el-input v-model="form.postcode" placeholder="请输入邮政编码" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="form.address" :maxlength="200" placeholder="请输入联系地址" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" :maxlength="200" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-col>
    </vue-scroll>
    <div class="drawer-btns">
      <el-button size="medium" type="primary" @click="submitForm('addForm')">提交</el-button>
      <el-button size="medium" type="primary" plain @click="resetForm('addForm')">清空</el-button>
      <el-button size="medium" @click="close">关闭</el-button>
    </div>
  </el-form>
</template>

<script>
import TreeSelect from '@/components/TreeSelect/index'
export default {
  name: 'Add',
  components: {
    TreeSelect
  },
  props: {
    tit: {
      type: String,
      default() {
        return
      }
    },
    close: {
      type: Function,
      default() {
        return
      }
    },
    init: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      nodeKey: 'value',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      orgTypeList: [{
        value: '1',
        label: '管辖部门'
      }, {
        value: '2',
        label: '科室'
      }],
      form: {
        id: '',
        orgName: '',
        parentIds: '',
        orgType: '',
        telephone: '',
        postcode: '',
        address: '',
        remark: ''
      },
      rules: {
        id: [
          { required: true, message: '请先输入功能代码', trigger: 'blur' },
          { max: 12, message: '长度须低于12个字符串' }
        ],
        orgName: [
          { required: true, message: '请先输入功能名称', trigger: 'change' }
        ],
        telephone: [
          { pattern: /^(1\d{10})$/, message: '请输入正确的号码', trigger: 'blur' }
        ],
        postcode: [
          { pattern: /^\d{6}$/, message: '请输入正确的邮政编码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 监听--多选弹框树型的默认值变化与弹框隐藏事件--获取选中ID
    popoverHide(checkedIds) {
      this.form.dataRightDept = String(checkedIds)
    },
    // 提交表单数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.parentId = this.form.parentIds[this.form.parentIds.length - 1]
          this.$emit('success', this.form)
        } else {
          return false
        }
      })
    },
    // 清空表单数据
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
 .el-row {
    .el-col {
      margin-bottom: 5px;
    }
 }
</style>
