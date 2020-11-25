<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像 -->
      <div class="avatar_box">
        <div class="img-box">
          <img :src="logo" alt />
        </div>
      </div>
      <!-- 表单 -->
      <el-form class="form-container" :model="formData" :rules="rules" ref="loginFormRef">
        <!-- user -->
        <el-form-item prop="user">
          <el-input placeholder="请输入用户名" prefix-icon="iconfont icon-user" v-model="formData.user"></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="iconfont icon-IOTtubiao_huabanfuben"
            v-model="formData.password"
          ></el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item class="login-btn">
          <el-button plain @click="login('loginFormRef')">登录</el-button>
          <el-button plain @click="unset('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 请求API
import { userLogin } from 'network/user.js'
import logo from 'assets/logo.png'
export default {
  name: 'Login',
  data () {
    // 验证用户名，自定义验证
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
        if (!uPattern.test(value)) {
          callback(new Error('请输入4-16位数字字母组下划线组成的用户名'))
        }
        callback()
      }, 500)
    }

    return {
      logo,
      formData: {
        user: 'admin',
        password: '123456'
      },
      rules: {
        user: [{ validator: checkUser, trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    unset (key) {
      // 拿到el-form实例
      // 实例的resetFields方法会重置表单
      this.$refs[key].resetFields()
    },
    login (key) {
      // 表单验证是否成功
      this.$refs[key].validate(async isSucess => {
        if (isSucess === true) {
          console.log('成功')
          // 调用登录接口
          const result = await userLogin(this.formData)
          // 成功了把token存起来。弹出消息。更改路由
          if (result.meta.status === 200) {
            sessionStorage.setItem('token', result.data.token)
            // 把token存在vuex中
            this.$store.dispatch('commitChangeToken', result.data.token)
            // 弹出成功信息
            this.$Message({
              message: '登录成功。数据已存储',
              type: 'success'
            })
            // 路由跳转
            this.$router.push('home')
          } else {
            // 请求接口成功，但是状态不为成功
            this.$Message({
              message: '用户名不存在',
              type: 'info'
            })
          }
        } else {
          // 表单验证不通过
          console.log('不成功')
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  position: relative;
}
.login-box {
  position: absolute;
  width: 450px;
  height: 300px;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  .avatar_box {
    box-sizing: border-box;
    position: absolute;
    width: 150px;
    height: 150px;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid #eee;
    background-color: #fff;
    box-shadow: 0 0 1px 1px #eee;
    .img-box {
      width: 80%;
      height: 80%;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #f2e6e6;
    }
    img {
      position: absolute;
      width: 70%;
      height: 70%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .form-container {
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
  }
  .login-btn {
    display: flex;
    justify-content: space-around;
    button {
      border-color: none;
    }
  }
}
</style>
