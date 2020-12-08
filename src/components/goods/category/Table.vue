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
    <!-- 具名作用域插槽，配合columns数组每一项属性为template的值作为具名。 -->
    <template #cat_deleted="scope">
      <i
        class="el-icon-success"
        v-if="scope.row.cat_deleted"
        :style="{'color':'lightgreen','font-size':'16px'}"
      ></i>
      <i class="el-icon-error" v-else :style="{'color':'lightgreen','font-size':'16px'}"></i>
    </template>

    <template #order="scope">
      <el-tag :type="elTagType(scope.row.cat_level)">{{elTagValue(scope.row.cat_level)}}</el-tag>
    </template>

    <!-- 列选项对应的template（这里对应operation） -->
    <!-- 具名作用域插槽 -->
    <template #operation="scope">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="editGoodsCate(scope.row)">编辑</el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="deleteGoodsCate(scope.row)"
      >删除</el-button>
    </template>
  </tree-table>
</template>

<script>
import { deleteGoodsCategory } from "network/goods.js";
import { requestValidate } from "utils/tools.js";
export default {
  props: {
    categoryList: {
      type: Array
    }
  },

  data() {
    return {
      props: {
        stripe: false, //斑马线
        border: false, //右边框
        showHeader: true, //表头
        showSummary: false, //总和
        showRowHover: true, //hover效果
        showIndex: false, //索引项
        treeType: true, //树结构
        isFold: true, //收起
        expandType: false, //扩展栏
        selectionType: false //复选框
      },

      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          type: "template",
          template: "cat_deleted"
        },
        {
          label: "排序",
          type: "template",
          template: "order"
        },
        {
          label: "操作",
          type: "template",
          template: "operation"
        }
      ],
      goodsInfo: {}
    };
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
    // 编辑商品分类
    editGoodsCate(info) {
      this.goodsInfo = {
        cat_id: info.cat_id,
        cat_name: info.cat_name,
        cat_pid: info.cat_pid
      };
      this.$emit("changeCurrentGoodsInfo", goodsInfo);
      this.$store.commit(
        "goodsCategory/setEditGoodsCategoryDialogVisible",
        true
      );
    },
    // 删除商品分类
    async deleteGoodsCate(info) {
      let result = await this.$MessageBox.confirm(
        "此操作将永久删除该分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        console.log(err);
      });

      if (result === "confirm") {
        requestValidate(
          deleteGoodsCategory,
          { cat_id: info.cat_id },
          200,
          res => {
            console.log(info)
            this.$Message.success(res.meta.msg);
            this.$emit('getGoodsCategoryList')

          }
        );
      } else if (result === "cancel") {
        this.$Message.info('取消删除操作');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table-tree {
  margin-top: 20px;
}
</style>
