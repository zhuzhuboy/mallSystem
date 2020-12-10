<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column type="expand"></el-table-column>
    <el-table-column type="index" label="#" width="50"></el-table-column>

    <el-table-column
      v-for="item in tableCol"
      :key="item.id"
      :prop="item.props"
      :label="item.label"
      width="180"
    ></el-table-column>
    <el-table-column label="操作">
      <template v-slot="scopeProps">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scopeProps.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="deleteProps(scopeProps.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteParamsOrProps } from "network/goods.js";
import { requestValidate } from "utils/tools.js";
export default {
  name: "paramTable",
  props: {
    tableData: {
      type: Array
    },
    tableCol: {
      type: Array
    }
  },
  methods: {
    edit(props) {
      console.log(props);
      this.$emit("editPropsOrParams", props);
    },
    async deleteProps(props) {
      this.$emit('handleDelectProps',props)
    }
  }
};
</script>

<style>
</style>
