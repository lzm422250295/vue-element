// src/mixins/clickMixin.js
export default {
  data() {
    return {
      rules: {
        menuName: [
          { required: true, message: '请先输入菜单码', trigger: 'blur' }
        ],
        functionCode: [
          { max: 9, message: '长度须低于9个字符串' }
        ],
        valueCode: [
          { max: 9, message: '长度须低于12个字符串' }
        ],
        username: [
          { required: true, message: '请先输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          // { validator: this.validUserName, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请先输入姓名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请先输入密码', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请先选择性别', trigger: 'change' }
        ],
        orgIds: [
          { required: true, message: '请先输入管辖部门', trigger: 'blur' }
        ],
        mobilePhone: [
          { pattern: /^(\d{3}-\d{8})$|^(\d{4}-\d{7})$|^(\d{8})$|^(\d{7})$|^(1\d{10})$/, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        telPhone: [
          { pattern: /^(1\d{10})$/, message: '请输入正确的号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

  }
}
