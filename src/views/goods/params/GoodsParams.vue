<template>
  <div>
    <!-- 面包屑 -->
    <Breadcrumb path="/home" :breadcrumbList="breadcrumbList"  />
    <!-- 卡片区域 -->

    <Card :allGoodsCate="allGoodsCate"/>
  </div>
</template>

<script>
import Breadcrumb from "components/common/Breadcrumb.vue";
import Card from "components/goods/params/Card.vue";
import { goodsCategoryList } from "network/goods.js";
import { requestValidate } from "utils/tools.js";
export default {
  name: "goodsParams",
  components: {
    Breadcrumb,
    Card
  },
  data() {
    return {
      breadcrumbList: ["商品管理", "参数列表"],
      allGoodsCate:[]
    };
  },
  created(){
    this.getAllGoodsCate()
  },
  methods:{
    getAllGoodsCate(){
      requestValidate(goodsCategoryList,{},200,(res)=>{
        this.allGoodsCate = res.data
      })
    }
  }
};
</script>

<style>
</style>
