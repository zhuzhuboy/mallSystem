<template>
  <el-dialog
    title="添加分类"
    :visible.sync="goodsCateDialogVisible"
    width="50%"
    center
    @close="dialogClose"
  >
    <!-- 内容区，表单 -->
    <el-form
      :model="addCateForm"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>

      <el-form-item label="父级分类">
        <!-- options是渲染的数据，props是规定渲染数据以怎样的方式呈现。model是渲染数据的结果 -->
        <el-cascader
          v-model="selectKeys"
          :options="parentCateList"
          :props="props"
          @change="handleChange"
          clearable
        ></el-cascader>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="dialogConfirmBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkName,requestValidate } from "utils/tools.js";
import {addGoodsCategory} from 'network/goods.js'
export default {
  name: "addGoodsCateDialog",
  data() {
    return {
      addCateForm: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0
      },
      rules: {
        cat_name: [
          {
            validator: checkName,
            trigger: "blur"
          }
        ]
      },
      // 双向绑定级联菜单
      selectKeys: "",
      // 级联菜单配置项。
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        expandTrigger: "hover"
      }
    };
  },
  props: {
    // 父级分类列表，级联菜单使用
    parentCateList: {
      type: Array
    }
  },
  computed: {
    goodsCateDialogVisible: {
      set() {},
      get() {
        return this.$store.state.goodsCategory.addGoodsCategoryDialogVisible;
      }
    }
  },
  methods: {
    dialogClose() {
      // 添加商品分类对话框不显示
      this.$store.commit(
        "goodsCategory/setAddGoodsCategoryDialogVisible",
        false
      );
      // 级联菜单绑定内容清空
      this.selectKeys = "";
      // 重置form表单
      this.addCateForm = {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0
      };
    },
    dialogConfirmBtn() {
      // 验证表单
      this.$refs.formRef.validate(isSuccess => {
        // 判断表单是否通过
        if (isSuccess) {
          // 调用添加分类及成功操作接口
          requestValidate(addGoodsCategory,this.addCateForm,201,(res)=>{
            // 消息提示
            this.$Message.success(res.meta.msg)
            // 关闭dialog
            this.dialogClose()
            // 触发更新渲染
            this.$emit('getGoodsCategoryList')

          })

        }
      });
    },
    // 级联选择器发生变化
    handleChange() {
      // 得到结果数据长度。
      let len = this.selectKeys.length;
      if (len > 0) {
        // 得到父ID
        let cat_pid = this.selectKeys[len - 1];
        // 重新赋值，发生改变。改变数据
        this.addCateForm.cat_pid = cat_pid;
        this.addCateForm.cat_level = len;
      } else if (len == 0) {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      }
      console.log(this.selectKeys);
    }
  }
};
</script>

<style>
.el-cascader {
  width: 100%;
}
.el-cascader-panel {
  height: 200px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
