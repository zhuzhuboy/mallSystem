<template>
  <div class="home">
    <el-button @click="logout">退出</el-button>
  </div>
</template>

<script>
import { isValidate } from 'network/validate.js'
export default {
  name: 'Home',
  components: {},
  // 路由独享守卫。通过判断sessionStorage有没有token来决定是否有权限跳转到该页面
  beforeRouteEnter: (to, from, next) => {
    const token = window.sessionStorage.getItem('user')
    console.log(token)
    if (!token) next('login')
    isValidate().then(res => {
      if (res.data.GOON) {
        next()
      }
    })
  },
  methods: {
    logout () {
      window.sessionStorage.removeItem('user')
      this.$router.replace('/login')
    }
  }
}
</script>
