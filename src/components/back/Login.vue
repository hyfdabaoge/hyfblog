<template>
  <div class="container">
    <el-row>
      <el-col :span="7" :offset="8" style="margin-top: 200px;">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="用户登录" name="first">
          <el-col>
            <el-form class="login_form" label-width="60px" :model="loginForm" ref="loginForm">
			<!-- <h3 class="title">欢迎登陆后台管理系统</h3> -->
              <el-form-item prop="account" label="账号" :rules="rules.account">
				<el-input type="text" v-model="loginForm.account"></el-input>
              </el-form-item>
              <el-form-item prop="password" label="密码" :rules="rules.password">
				<el-input type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-button class="login_button" type="primary" @click="submitForm">登录</el-button>
              <el-button class="login_button" type="primary" @click="resetForm">重置</el-button>
            </el-form>
          </el-col>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">
            <Reg></Reg>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '../../api'
import Reg from './Reg.vue'
export default{
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      activeName: this.$store.state.activeName,
      rules: {
        account: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    }
  },
  components: {
    Reg
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let obj = this.loginForm
          api.userLogin(obj)
          .then((response) => {
            console.log(response)
            if (!response.data.info) {
              console.log('账户不存在！')
            } else if (response.data.success) {
              console.log('登录成功')
              this.$store.dispatch('UserLogin', response.data.token)
              this.$router.replace({path: '/admin/articlelist'})
            } else {
              console.log('submit error')
            }
          })
        }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style>

</style>
