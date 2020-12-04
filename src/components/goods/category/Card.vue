<template>
  <el-card>
    <!-- 添加分类按钮 -->
    <el-row>
      <el-col>
        <el-button type="primary">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <Table :categoryList="categoryList"/>

    <!-- 分页按钮 -->
    <Pagination  :queryInfo="pageInfo"  :total="total"/>
  </el-card>
</template>

<script>
import Pagination from "components/common/Pagination.vue";
import Table from "./Table.vue"
export default {
  name: "card",
  components: {
    Pagination,
    Table
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
  created(){
    console.log(this.pageInfo)
  }
};
</script>

<style>
</style>
