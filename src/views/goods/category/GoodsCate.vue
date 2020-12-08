<template>
  <div>
    <!-- 面包屑 -->
    <Breadcrumb path="/home" :breadcrumbList="breadcrumbList" />
    <!-- 卡片区域 -->
    <Card
      :pageInfo="pageInfo"
      :total="total"
      :categoryList="categoryList"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @getParentCategory="getParentCategory"
      @changeCurrentGoodsInfo="changeCurrentGoodsInfo"
      @getGoodsCategoryList="getGoodsCategoryList"

    />
    <!-- 添加商品分类对话框 -->
    <AddCateDialog :parentCateList="parentCateList" @getGoodsCategoryList="getGoodsCategoryList" />

    <!-- 编辑商品分类对话框 -->
    <EditGoodsCateDialog :currentGoodsInfo="currentGoodsInfo"
    @getGoodsCategoryList="getGoodsCategoryList"
    />
  </div>
</template>

<script>
import Breadcrumb from "components/common/Breadcrumb.vue";
import Card from "components/goods/category/Card.vue";
// 添加商品分类组件
import AddCateDialog from "components/goods/category/AddGoodsCateDialog.vue";
// 编辑商品信息组件
import EditGoodsCateDialog from "components/goods/category/EditGoodsCateDialog.vue";
import { goodsCategoryList } from "network/goods.js";
import { requestValidate } from "utils/tools.js";
export default {
  name: "goodsCate",
  components: {
    Breadcrumb,
    Card,
    AddCateDialog,
    EditGoodsCateDialog
  },
  created() {
    this.getGoodsCategoryList();
  },
  data() {
    return {
      breadcrumbList: ["商品管理", "商品分类"],
      // page信息
      pageInfo: {
        pagenum: 1,
        pagesize: 5,
        type: 3
      },
      categoryList: [],
      total: null,
      parentCateList:[],//前两级列表
      currentGoodsInfo:{}//当前商品信息
    };
  },
  methods: {
    // 请求商品分类数据
    getGoodsCategoryList() {
      // 默认请求第一页，一页10条
      requestValidate(
        goodsCategoryList,
        this.pageInfo,
        200,
        res => {
          // 得到分类列表
          this.categoryList = res.data.result;
          // 得到总数
          this.total = res.data.total;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 页码发生改变
    handleCurrentChange(pageNum) {
      this.pageInfo.pagenum = pageNum;
      // 重新获取改变后的页码数据
      this.getGoodsCategoryList();
    },
    // 页容量发生改变
    handleSizeChange(pageSize) {
      this.pageInfo.pagesize = pageSize;
      // 重新获取改变后的页容量数据
      this.getGoodsCategoryList();
    },
    // 获取前两级分类列表
    getParentCategory() {
      requestValidate(
        goodsCategoryList,
        {type:2},
        200,
        res => {
          console.log(res)
          // 得到分类列表
          this.parentCateList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 更改当前商品信息
    changeCurrentGoodsInfo(goods){
      console.log(goods)
      this.currentGoodsInfo= goods
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
