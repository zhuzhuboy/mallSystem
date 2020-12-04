<template>
  <div>
    <!-- 面包屑 -->
    <Breadcrumb path="/home" :breadcrumbList="breadcrumbList" />
    <Card :pageInfo="pageInfo" :total="total" :categoryList="categoryList" />
    <!-- 卡片区域 -->
  </div>
</template>

<script>
import Breadcrumb from "components/common/Breadcrumb.vue";
import Card from "components/goods/category/Card.vue";
import { goodsCategoryList } from "network/goods.js";
import { requestValidate } from "utils/tools.js";
export default {
  name: "goodsCate",
  components: {
    Breadcrumb,
    Card
  },
  created() {
    this.getGoodsCategoryList()
  },
  data() {
    return {
      breadcrumbList: ["商品管理", "商品分类"],
      // page信息
      pageInfo: {
        pagenum: 1,
        pagesize: 5,
        type:3
      },
      categoryList:[],
      total:null,
    };
  },
  methods: {
    // 请求商品分类数据
    getGoodsCategoryList() {
      // 默认请求第一页，一页10条
      requestValidate(goodsCategoryList,this.pageInfo,200,(res)=>{
        // 得到分类列表
        this.categoryList = res.data.result;
        // 得到总数
        this.total = res.data.total;
      },(err)=>{
        console.log(err)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
