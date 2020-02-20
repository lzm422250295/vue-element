<template>
  <div>
    <Drawer v-if="drawerShow" :close="closeDrawer" :width="900">
      <Add
        :tit="isAddChild ? '添加子节点' : '添加同级节点'"
        :close="closeDrawer"
        @success="add"
      />
    </Drawer>
    <el-row :gutter="12">
      <el-col :span="9">
        <div :style="allHeight" class="white-box">
          <vue-scroll>
            <el-tree
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              :default-expanded-keys="treeExpandedKeys"
              node-key="value"
              accordion
              @node-click="handleNodeClick"
            />
          </vue-scroll>
        </div>
      </el-col>
      <el-col :span="15">
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          :style="allHeight"
          label-width="140px"
          class="white-box margin-0"
        >
          <el-col :span="24">
            <el-form-item label="功能代码" prop="functionCode">
              <el-input v-model="form.functionCode" :disabled="isChoose" placeholder="请输入功能代码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="功能名称" prop="functionName">
              <el-input v-model="form.functionName" :disabled="isChoose" :maxlength="150" placeholder="请输入功能名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否需要授权" prop="isNeedAuth">
              <el-radio v-model="form.isNeedAuth" :disabled="isChoose" label="0">无需授权</el-radio>
              <el-radio v-model="form.isNeedAuth" :disabled="isChoose" label="1">需要授权</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否需要记录日志" prop="isRecordLog">
              <el-radio v-model="form.isRecordLog" :disabled="isChoose" label="0">无需记录</el-radio>
              <el-radio v-model="form.isRecordLog" :disabled="isChoose" label="1">需要记录</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="启用状态" prop="enableStatus">
              <el-radio v-model="form.enableStatus" :disabled="isChoose" label="0">停用</el-radio>
              <el-radio v-model="form.enableStatus" :disabled="isChoose" label="1">启用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" :disabled="isChoose" :maxlength="200" type="textarea" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="btns-right">
            <el-button size="small" class="button-center" type="primary" icon="el-icon-refresh" @click="flush">刷新缓存</el-button>
            <el-button :disabled="isChoose" size="small" type="primary" icon="el-icon-circle-plus-outline" @click="drawerShow=true,isAddChild = false">添加同级节点</el-button>
            <el-button :disabled="isChoose" size="small" type="primary" icon="el-icon-circle-plus-outline" @click="drawerShow=true,isAddChild = true">添加子节点</el-button>
            <el-button :disabled="isChoose" size="small" type="primary" icon="el-icon-circle-check-outline" @click="submitForm('form')">确认修改</el-button>
            <el-button :disabled="isChoose" size="small" type="danger" icon="el-icon-delete" @click="del('form')">删除</el-button>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getList, init } from '@/api/system/funMage'
import Drawer from '@/components/Drawer/index'
import Add from './add'
export default {
  name: 'TransactionTreeMge',
  components: {
    Drawer,
    Add
  },
  data() {
    return {
      isAddChild: Boolean,
      drawerShow: false,
      isChoose: true,
      allHeight: '',
      treeExpandedKeys: [], // tree默认打开节点ids
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        functionCode: '',
        functionName: '',
        parentCode: '',
        isNeedAuth: '',
        isRecordLog: '',
        enableStatus: '',
        remark: ''
      },
      rules: {
        functionCode: [
          { required: true, message: '请先输入功能代码', trigger: 'blur' },
          { max: 9, message: '长度须低于9个字符串' }
        ],
        functionName: [
          { required: true, message: '请先输入功能名称', trigger: 'change' }
        ],
        parentCode: [
          { required: true, message: '请先输入上级功能代码', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.allHeight = 'height:' + (document.body.clientHeight - 98) + 'px'
      init().then((res) => { // 获取树形数据
        this.treeData = res.data.adminDeptTree
        // this.treeExpandedKeys = res.data.openIds // 默认展开
      })
    },
    handleNodeClick(data) {
      this.isChoose = false
      // getChackTreeData(data.value).then(res => {
      //   this.form = res.data
      // })
    },
    // 刷新缓存
    flush() {
      refreshCache().then(() => {
        this.fetchData()
        this.$refs['form'].resetFields()
      })
    },
    // 新增
    add(val) {
      if (this.isAddChild) {
        val.parentCode = this.form.functionCode
      } else {
        val.parentCode = this.form.parentCode // 上级功能码
      }
      submit('add', val).then((res) => {
        this.fetchData() // 重新加载数据
        this.drawerShow = false
        this.$refs['form'].resetFields()
      }).catch(() => {
      })
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          submit('updata', this.form).then((res) => {
            this.fetchData() // 重新加载数据
            this.$refs['form'].resetFields()
          }).catch(() => {
          })
        }
      })
    },
    // 删除
    del() {
      if (this.$refs.tree.getCurrentNode()) {
        this.$confirm('此操作将永久删除该功能, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const id = this.form.functionCode
          del(id).then((res) => {
            // 重新加载数据
            this.fetchData()
            // 清空from
            this.$refs['form'].resetFields()
          })
        }).catch(() => {
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
<style>
.button-center{
margin-bottom: 18px;
}
</style>
