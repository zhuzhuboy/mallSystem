<template>

  <tree-table
    class="table-tree"
    ref="table"
    sum-text="sum"
    index-text="#"
    :data="categoryList"
    :columns="columns"
    :stripe="props.stripe"
    :border="true"
    :show-header="props.showHeader"
    :show-summary="props.showSummary"
    :show-row-hover="props.showRowHover"
    :tree-type="props.treeType"
    :is-fold="props.isFold"
    :expand-type="props.expandType"
    :selection-type="props.selectionType"
    :show-index="true"
  >
    <!-- 列选项对应的template（这里对应cat_deleted） -->
    <template slot="cat_deleted" scope="scope">
      {{ scope.row.cat_deleted}}
    </template>
    <!-- 列选项对应的template（这里对应operation） -->
    <template slot="operation" scope="scope">
      <pre>
        {{ scope.row.cat_name}}
      </pre>
    </template>
  </tree-table>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array
    }
  },
  created() {
    console.log(this.categoryList);
    setTimeout(() => {
      console.log(this.categoryList);
    }, 1000);
  },
  data() {
    return {
      props: {
        stripe: false,//斑马线
        border: false,//右边框
        showHeader: true,//表头
        showSummary: false,//总和
        showRowHover: true,//hover效果
        showIndex: false,//索引项
        treeType: true,//树结构
        isFold: true,//收起
        expandType: false,//扩展栏
        selectionType: false//复选框
      },

      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          type: "template",
          template: "cat_deleted",
          minWidth: "50px"
        },
        {
          label: "排序",
          prop: "cat_level"
        },
        {
          label: "操作",
          type: "template",
          template: "operation"
        },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>

.table-tree{
  margin-top: 20px;
}
</style>
