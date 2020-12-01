<template>
  <el-row :gutter="20">
    <el-col :span="7">
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        :value="queryInfo.query"
        @input="serchInput"
        clearable
        @clear="clearInput"
      >
        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
      </el-input>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" @click="addUser">添加用户</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    queryInfo: {
      type: Object
    },
    addFormRef: {
      type: Object
    }
  },
  methods: {
    // 搜索
    serchInput(e) {
      this.$emit("changeQueryInfo", {
        query:e
      });
    },
    // 清除query内容后把queryInfo.pagenum重置为1
    clearInput() {
      this.$emit("changeQueryInfo", {
        pagenum:1,
        query:''
      });
      // 获取用户列表
      this.$emit("getUserList");
    },
    //搜索按钮。点击获取第一页用户数据
    getUserList() {
       this.$emit("changeQueryInfo", {
        pagenum:1,
      });
      this.$emit("getUserList");
    },
    // 添加用户
    addUser() {
      // dialog会话显示
      this.$store.commit("userModule/setDialogVisible", true);
      // 执行elementUI表单实例的resetFields方法。清空表单
      this.$nextTick(() => {
        this.addFormRef && this.addFormRef.resetFields();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
