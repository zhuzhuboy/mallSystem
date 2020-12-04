<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="user-break">
    <el-breadcrumb-item :to="{ path: path }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "breadcrumb",
  props:{
    path:{
      type:String
    },
    breadcrumbList:{
      type:Array
    }
  }
};
</script>

<style lang="scss" scoped>
.user-break {
  margin-bottom: 20px;
}
</style>
