<template>
  <el-table
    :data="categoryList"
    style="width: 100%"
    row-key="cat_id"
    border
    lazy
    :tree-props="{children: 'children'}"
  >
    <el-table-column type="index" width="50" :index="indexMethod"></el-table-column>

    <el-table-column prop="cat_name" label="分类名称"></el-table-column>
    <el-table-column prop="cat_deleted" label="是否有效" width="180">
      <template v-slot="scopeProps">
        <i
          class="el-icon-success"
          v-if="scopeProps.row.cat_deleted"
          :style="{'color':'lightgreen','font-size':'16px'}"
        ></i>
        <i class="el-icon-error" v-else :style="{'color':'lightgreen','font-size':'16px'}"></i>
      </template>
    </el-table-column>
    <el-table-column prop="cat_level" label="排序">
      <template v-slot="scopeProps">
        <el-tag :type="elTagType(scopeProps.row.cat_level)">{{elTagValue(scopeProps.row.cat_level)}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template v-slot="scopeProps">
        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array
    }
  },
  methods: {
    elTagType(val) {
      if (val === 1) {
        return "success";
      } else if (val === 2) {
        return "warning";
      }
    },
    elTagValue(val) {
      if (val === 0) {
        return "一级";
      } else if (val === 1) {
        return "二级";
      } else {
        return "三级";
      }
    },
    indexMethod(index){
      console.log(index)
      return index
    }
  }
};
</script>

<style lang="scss" scoped>
.table-tree {
  margin-top: 20px;
}
</style>
