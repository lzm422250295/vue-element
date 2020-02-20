<template>
  <div>
    <Drawer :is-show="drawerShow" :close="closeDrawer" :width="900">
      <Add :init="initData" :close="closeDrawer" tit="添加部门" @success="add" />
    </Drawer>
    <el-row :gutter="12">
      <el-col :span="8">
        <div :style="allHeight" class="white-box pad-bot-15">
          <vue-scroll>
            <el-tree
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              :default-expanded-keys="orgTreeExpandedKeys"
              node-key="value"
              @node-click="handleNodeClick"
            />
          </vue-scroll>
        </div>
      </el-col>
      <el-col :span="16">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          :style="allHeight"
          size="small"
          label-width="140px"
          class="white-box margin-0"
        >
          <el-col :span="24">
            <el-form-item label="部门编号" prop="id">
              <el-input v-model="form.id" :disabled="isChoose" placeholder="请输入用户名(参考行政区划编码规则)" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门名称" prop="orgName">
              <el-input v-model="form.orgName" :maxlength="150" :disabled="isChoose" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="上级部门" prop="parentIds">
              <el-cascader
                v-model="form.parentIds"
                :disabled="isChoose"
                :options="initData.parentIdList"
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
              <el-select v-model="form.orgType" :disabled="isChoose" clearable placeholder="请选择部门类型">
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
                :disabled="isChoose"
                :data="initData.dataRightDeptList"
                :default-props="defaultProps"
                :default-checked-keys="defaultCheckedKeys"
                :node-key="nodeKey"
                multiple
                @popoverHide="popoverHide"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="手机号码" prop="telephone">
              <el-input v-model="form.telephone" :disabled="isChoose" placeholder="请输入手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="邮政编码" prop="postcode">
              <el-input v-model="form.postcode" :disabled="isChoose" placeholder="请输入邮政编码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系地址" prop="address">
              <el-input v-model="form.address" :maxlength="200" :disabled="isChoose" placeholder="请输入联系地址" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" :maxlength="200" :disabled="isChoose" type="textarea" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="btns-right">
            <el-button size="small" type="primary" icon="el-icon-refresh" @click="flush">刷新缓存</el-button>
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="drawerShow=true">添加部门</el-button>
            <el-button :disabled="isChoose" size="small" type="primary" icon="el-icon-circle-check-outline" @click="submitForm('form')">确认修改</el-button>
            <el-button :disabled="isChoose" size="small" type="danger" icon="el-icon-delete" @click="del">删除</el-button>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getSysUser, init, getCheck, edit } from '@/api/system/departmentMage'
// import { getTreeData, getChackTreeData, init, submit, selectSon, del, refreshCache } from '@/api/system/userMsg/departmental'
import TreeSelect from '@/components/TreeSelect/index'
import Drawer from '@/components/Drawer/index'
import Add from './add'
export default {
  name: 'Departmental',
  components: {
    TreeSelect,
    Drawer,
    Add
  },
  data() {
    return {
      drawerShow: false,
      isChoose: true,
      orgTreeExpandedKeys: [], // 左边树形默认展开
      nodeKey: 'value',
      defaultCheckedKeys: [],
      allHeight: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {},
      rules: {
        id: [
          { required: true, message: '请先输入功能代码', trigger: 'blur' }
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
      },
      initData: {
        parentIdList: [],
        dataRightDeptList: []
      },
      orgTypeList: [{
        value: '1',
        label: '管辖部门'
      }, {
        value: '2',
        label: '科室'
      }]

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 监听--多选弹框树型的默认值变化与弹框隐藏事件--获取选中ID
    popoverHide(checkedIds) {
      this.form.dataRightDept = String(checkedIds)
    },
    // 初始化数据
    init() {
      this.allHeight = 'height:' + (document.body.clientHeight - 97) + 'px'
      // 获取org管辖部门 树形下拉数据
      init().then(res => {
        this.treeData = res.data.adminDeptTree
      })
    },
    // 树型点击事件
    handleNodeClick(data) {
      this.isChoose = false
      getChackTreeData(data.value).then(res => {
        if (res.data.id !== '3211') {
          const defaultCheckedKeys = res.data.dataRightDepts.filter(function(el) {
            return (String(el).length > 4)
          })
          this.defaultCheckedKeys = defaultCheckedKeys
        }
        if (res.data.parentId) { //
          const parentId = String(res.data.parentId)
          switch (parentId.length) {
            case 6:
              res.data.parentIds = [parentId.slice(0, 4), parentId]
              break
            default:
              res.data.parentIds = [parentId.slice(0, 4), parentId.slice(0, 6), parentId]
              break
          }
        }
        this.form = res.data
      })
    },
    // 刷新缓存
    flush() {
      refreshCache().then(() => {
        this.fetchData() // 重新加载数据
      })
    },
    // 添加
    add(val) {
      submit('add', val).then(() => {
        this.fetchData() // 重新加载数据
        this.drawerShow = false
      })
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.parentIds || this.form.parentIds !== []) {
            this.form.parentId = this.form.parentIds[this.form.parentIds.length - 1]
          } else {
            this.form.parentId = ''
          }
          submit('updata', this.form).then(res => {
            this.fetchData() // 重新加载数据
            this.$refs['form'].resetFields()// 清空表单
            this.defaultCheckedKeys = []
            this.form.dataRightDepts = []
          })
        } else {
          return false
        }
      })
    },
    // 删除
    del() {
      if (this.form.id) {
        // 删除前的验证
        selectSon(this.form.id).then((res) => {
          if (res.data.length > 0) {
            this.$message({
              message: '该部门存在子部门，请先删除子部门！',
              type: 'warning'
            })
          } else {
            this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              del(this.form.id).then((res) => {
                this.fetchData() // 重新加载数据
                this.$refs['form'].resetFields()// 清空表单
                this.defaultCheckedKeys = []
                this.form.dataRightDepts = []
              })
            }).catch(() => {
            })
          }
        })
      } else {
        this.$message({
          message: '请选择需要删除的数据',
          type: 'warning'
        })
      }
    },
    // 关闭详情抽屉
    closeDrawer() {
      this.$confirm('是否关闭', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.drawerShow = false
      }).catch(() => {
      })
    }
  }
}
</script>
