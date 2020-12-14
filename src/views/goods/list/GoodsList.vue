<template>
  <div>
    <!-- 面包屑 -->
    <Breadcrumb path="/home" :breadcrumbList="breadcrumbList" />

    <!-- 卡片视图区 -->
    <Card />
  </div>
</template>

<script>
import Breadcrumb from "components/common/Breadcrumb.vue";
import Card from 'components/goods/list/Card.vue'
export default {
  name:"goodsList",
  components: {
    Breadcrumb,
    Card
  },
  data() {
    return {
      breadcrumbList: ["商品管理", "商品分类"]
    };
  }
};
</script>

<style>
</style>
