<template>
  <el-dialog
    title="添加分类"
    :visible.sync="editCateDialogVisible"
    width="50%"
    center
    @close="dialogClose"
  >
    <!-- 内容区，表单 -->
    <el-form
      :model="currentGoodsInfo"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="currentGoodsInfo.cat_name"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="dialogConfirmBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editGoodsCategory } from "network/goods.js";
import { checkName, requestValidate } from "utils/tools.js";
export default {
  name: "editGoodsCateDialog",
  data() {
    return {
      rules: {
        cat_name: [
          {
            validator: checkName,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    editCateDialogVisible: {
      set() {},
      get() {
        return this.$store.state.goodsCategory.editGoodsCategoryDialogVisible;
      }
    }
  },
  props: {
    currentGoodsInfo: {
      type: Object
    }
  },

  methods: {
    dialogClose() {
      this.$store.commit(
        "goodsCategory/setEditGoodsCategoryDialogVisible",
        false
      );
    },
    dialogConfirmBtn() {
      this.$refs.formRef.validate(isSuccess => {
        // 判断表单是否通过
        if (isSuccess) {
          requestValidate(
            editGoodsCategory,
            this.currentGoodsInfo,
            200,
            res => {
              // 关闭对话框
              this.dialogClose()
              // 消息提示
              this.$Message.success(res.meta.msg)
              // 更新视图
              this.$emit('getGoodsCategoryList')
              console.log(res);
            }
          );
        }
      });
    }
  }
};
</script>

<style>
</style>
