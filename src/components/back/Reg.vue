<template>
	<div class="container">
		<el-form class="reg_form" label-width="100px" :model="regForm" ref="regForm">
<!-- 			<h3 class="title">系统注册</h3> -->
			<el-form-item prop="account" label="账号" :rules="rules.account">
				<el-input type="text" v-model="regForm.account"></el-input>
			</el-form-item>
			<el-form-item prop="password" label="密码" :rules="rules.password">
				<el-input type="password" v-model="regForm.password"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass" label="再次输入" :rules="rules.checkPass">
				<el-input type="password" v-model="regForm.checkPass"></el-input>
			</el-form-item>
			<el-button class="login_button" type="primary" @click="submitForm">注册</el-button>
			<el-button class="login_button" type="primary" @click="resetForm">重置</el-button>
		</el-form>
	</div>
</template>

<script>
import api from '../../api'
export default {
  data () {
   // 密码安全性要求
    let validatePass1 = (rule, value, callback) => {
            // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
      let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/
      if (!reg.test(value)) {
        callback(new Error('密码长度需6-16位，且包含字母和字符'))
      } else {
        callback()
      }
    }
        // 监测两次密码是否相同
    let validatePass2 = (rule, value, callback) => {
      value === '' ? callback(new Error('请再次输入密码')) : value !== this.regForm.password ? callback(new Error('两次输入密码不一致!')) : callback()
    }
    return {
      regForm: {
        account: '',
        password: '',
        checkPass: ''
      },
      rules: {
        account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePass1,
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          let obj = this.regForm
          api.userReg(obj)
          .then((response) => {
            if (response.success) {
              console.log('注册成功')
              this.$router.go(0)
              this.$router.push({path: '/login'})
            } else {
              console.log('账户已存在')
            }
          })
          .catch((err) => { console.log(err) })
        } else {
          console.log('submit error!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.regForm.resetFields()
    }
  }
}
</script>

<style>
	
</style>
