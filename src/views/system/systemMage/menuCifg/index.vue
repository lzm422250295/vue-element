<template>
  <div>
    <!-- <Drawer v-if="drawerShow" :close="()=>drawerShow = false" :width="900">
      <Add
        :close="()=>drawerShow = false"
        :tit="isAddChild ? '添加子节点' : '添加同级节点'"
        @success="add"
      />
    </Drawer> -->
    <el-row :gutter="12">
      <el-col :span="9">
        <div :style="allHeight" class="white-box pad-bot-15">
          <vue-scroll>
            <el-tree
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
          </vue-scroll>
        </div>
      </el-col>
      <el-col :span="15">
        <el-form
          ref="form"
          :disabled="isChoose"
          :rules="rules"
          :model="form"
          :style="allHeight"
          size="small"
          label-width="110px"
          class="white-box margin-0"
        >
          <el-col :span="24">
            <el-form-item label="菜单码" prop="menuCode">
              <el-input v-model="form.menuCode" placeholder="请输入菜单码" readonly="readonly" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单名" prop="menuName">
              <el-input v-model="form.menuName" :maxlength="150" placeholder="请输入菜单名" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="系统权限码" prop="functionCode">
              <el-input v-model="form.functionCode" placeholder="请输入系统权限交易码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="组件名" prop="componentName">
              <el-input v-model="form.componentName" :maxlength="30" placeholder="请输入组件名" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-radio v-model="form.Status" label="1">启用</el-radio>
              <el-radio v-model="form.Status" label="0">停用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单连接路径" prop="menuUrl">
              <el-input v-model="form.menuUrl" :maxlength="200" placeholder="请输入菜单连接路径" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单图标" prop="menuImage">
              <el-input v-model="form.menuImage" :maxlength="200" placeholder="请输入菜单图标" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提示信息" prop="tooltip">
              <el-input v-model="form.tooltip" :maxlength="200" placeholder="请输入提示信息" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="顺序" prop="rowOrder">
              <el-input v-model="form.rowOrder" :maxlength="11" placeholder="请输入顺序" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" :maxlength="200" type="textarea" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="btns-right">
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="drawerShow=true,isAddChild = false">添加同级菜单</el-button>
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="drawerShow=true,isAddChild = true">添加子菜单</el-button>
            <el-button size="small" type="primary" icon="el-icon-circle-check-outline" @click="submitForm('form')">确认修改</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="del">删除</el-button>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTreeData, getFormData } from '@/api/system/menuCifg'
import rules from '../../mixin/rules'
// import Drawer from '@/components/Drawer/index'
// import Add from './add'
// import Perm from '@/views/System/btnPermission'
export default {
  name: 'MenuMsg',
  components: {
    // Drawer,
    // Add
  },
  mixins: [rules],
  data() {
    return {
      // Perm: Perm.systemData,
      isAddChild: Boolean,
      drawerShow: false,
      isChoose: true,
      allHeight: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        menuCode: '',
        menuName: '',
        functionCode: '',
        valueCode: '',
        componentName: '',
        enableStatus: '',
        menuUrl: '',
        tooltip: '',
        rowOrder: '',
        menuImage: '',
        remark: '',
        upMenuCode: ''
      }

    }
  },
  mounted() {
    this.fetchData()
    this.allHeight = 'height:' + (document.body.clientHeight - 100) + 'px'
  },
  methods: {
    // 获取数据
    fetchData() {
      getTreeData().then(res => {
        this.treeData = res.data.treeData
      })
    },
    handleNodeClick(data) {
      this.isChoose = false
      getFormData(data.value).then(res => {
        this.form = res.data
      })
    },
    // 新增
    add(val) {
      if (this.isAddChild) {
        val.upMenuCode = this.form.valueCode
      } else {
        val.upMenuCode = this.form.upMenuCode
      }
      // submit('add', val).then((res) => {
      //   this.fetchData() // 重新加载数据
      //   this.drawerShow = false
      //   this.$refs['form'].resetFields()
      // })
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // submit('updata', this.form).then((res) => {
          //   this.fetchData() // 重新加载数据
          //   this.$refs['form'].resetFields()// 清空表单
          // })
        } else {
          return false
        }
      })
    },
    // 删除
    del() {
      if (this.$refs.tree.getCurrentNode()) {
        this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // del(this.form.menuCode).then((res) => {
          //   this.fetchData() // 重新加载数据
          //   this.$refs['form'].resetFields()// 清空表单
          // })
        }).catch(() => {
        })
      } else {
        this.$message({
          message: '请选择需要删除的数据',
          type: 'warning'
        })
      }
    }
  }
}
</script>

