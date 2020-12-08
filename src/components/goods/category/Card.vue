<template>
  <el-card>
    <!-- 添加分类按钮 -->
    <el-row>
      <el-col>
        <el-button type="primary" @click="addCategoryBtn">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 树表格,第三方库 -->
    <Table :categoryList="categoryList" @changeCurrentGoodsInfo="(goodsInfo)=>{$emit('changeCurrentGoodsInfo',goodsInfo)}"
      @getGoodsCategoryList="()=>{$emit('getGoodsCategoryList')}"

      />
    <!-- 树表格，elementUI，由于索引选项和树结构效果不能统一，所以放弃使用 -->
    <!-- <ElTable :categoryList="categoryList"/> -->
    <!-- 分页按钮 -->
    <Pagination  :queryInfo="pageInfo"  :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"/>
  </el-card>
</template>

<script>
import Pagination from "components/common/Pagination.vue";
import Table from "./Table.vue"
import ElTable from "./ElTabel.vue"
export default {
  name: "card",
  components: {
    Pagination,
    Table,
    ElTable
  },
  props: {
    pageInfo: {
      type: Object
    },
    total: {
      type:[String,Number]
    },
    categoryList: {
      type:Array
    }
  },

  methods:{
    // 页码
    handleCurrentChange(pageNum){
      this.$emit('handleCurrentChange',pageNum)
    },
    // 页容量
    handleSizeChange(pageSize){
      this.$emit('handleSizeChange',pageSize)
    },
    // 添加分类按钮
    addCategoryBtn(){
      // 触发获取前两级分类的事件
      this.$emit('getParentCategory')

      this.$store.commit('goodsCategory/setAddGoodsCategoryDialogVisible',true)
    },
  }

};
</script>

<style>
</style>
