<template>
  <!-- 对话框 -->
  <el-dialog :title="title" :visible.sync="dialogVisible" @close="dialogClose" width="40%" center>
    <!-- 表单区 -->
    <el-form
      :model="formData"
      :rules="rules"
      ref="fromRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="formLabel" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="confirmBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkName } from "utils/tools.js";
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean
    },
    type:{
      type:String
    }
  },
  data() {
    return {
      formData: {
        name: ""
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    dialogClose() {
      // 重置表单
      this.$refs.fromRef.resetFields();
      // 关闭对话框
      this.$emit("changeDialogVisible", false);
    },
    // 对话框确认按钮
    confirmBtn() {
      this.$refs.fromRef.validate(validator => {
        console.log(validator)
        if (!validator) {
          return;
        }
        // 如果对话框是添加类型
        if(this.type==='add'){
          this.$emit('addPropOrParam',this.formData.name)
          // 如果对话框是修改类型
        }else if(this.type==='modify'){
          this.$emit('modifyPropOrParam',this.formData.name)
        }
        console.log(this.type)

        console.log(this.formData.name);
      });

    },
    eventBus(){
      this.$eventBus.$on('formDataChange',(val)=>{
        this.formData.name= val
      })
    }
  },
  created(){
    this.eventBus()
  },
  computed: {
    formLabel() {
      return this.title && this.title.substr(2) + ":";
    },
    dialogVisible: {
      set(val) {
        this.$emit("changeDialogVisible", false);
      },
      get() {
        return this.visible;
      }
    }
  }
};
</script>

<style>
</style>
