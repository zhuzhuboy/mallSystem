<template>
  <el-pagination
        class="card-pagination user-break"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
</template>

<script>
export default {
  name: "pagination",
  props:{
    queryInfo:{
      type:Object,
      default:{}
    },
    total:{
      type:Number
    }
  },
  methods:{
    handleSizeChange(pagesize){
      // 页容量改变触发父组件handleSizeChange事件，事件层层传递。最终改变页容量。
      this.$emit('handleSizeChange',pagesize)
    },
    handleCurrentChange(pageNum){
      console.log(pageNum)
      // 页码改变触发父组件handleCurrentChange事件，事件层层传递。最终改变页码。
      this.$emit('handleCurrentChange',pageNum)
    }
  }

};
</script>

<style lang="scss" scoped>
.user-break {
  margin-top: 20px;
}
</style>
