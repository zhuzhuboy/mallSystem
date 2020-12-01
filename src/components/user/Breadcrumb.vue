<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="user-break">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "breadcrumb"
};
</script>

<style lang="scss" scoped>
.user-break {
  margin-bottom: 20px;
}
</style>
