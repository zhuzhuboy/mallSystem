<template>
  <el-card class="box-card">
    <!-- 搜索 -->
    <Search
      :queryInfo="queryInfo"
      :addFormRef="addFormRef"
      @changeQueryInfo="changeQueryInfo"
      @getUserList="getUserList"
    />

    <!-- 表格 -->
    <CardTable :users="users" :status="status"
     @getUserList="getUserList"
     />

    <!-- 分页 -->
    <Pagination
      :queryInfo="queryInfo"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import Pagination from "components/user/Pagination.vue";
import Search from "components/user/Search.vue";
import CardTable from "components/user/CardTable.vue";

export default {
  name: "card",
  components: {
    Pagination,
    Search,
    CardTable
  },
  data() {
    return {};
  },
  props: {
    queryInfo: {
      type: Object
    },
    users: {
      type: Array
    },
    total: {
      type: Number
    },
    addFormRef: {
      type: Object
    },
    status: {
      type: Array,
      default: []
    }
  },

  methods: {
    // 向父组件传递事件。修改queryInfo
    changeQueryInfo(queryInfo) {
      this.$emit("changeQueryInfo", queryInfo);
    },
    // 子传父事件改变页容量。重新获取用户列表
    handleSizeChange(pagesize) {
      // 传递的页容量值设置为对象。由父组件混合从而新值覆盖旧值
      this.$emit("changeQueryInfo", { pagesize });
      this.$emit("getUserList");
    },
    // 子传父事件改变页码。重新获取用户列表
    handleCurrentChange(pagenum) {
      this.$emit("changeQueryInfo", { pagenum });
      this.$emit("getUserList");
    },
    // 子传父事件改变搜索关键词
    queryChange(query) {
      this.$emit("changeQueryInfo", { query });
    },
    // 子传父事件获取用户列表
    getUserList() {
      this.$emit("getUserList");
    }
  }
};
</script>

<style>
</style>
