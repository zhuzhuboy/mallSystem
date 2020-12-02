<template>
  <el-dialog title="提示" :visible.sync="DialogVisible" width="40%" @close="dialogClose" center>
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleFormRef"
      label-width="100px"
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称：" prop="roleName">
        <el-input type="text" v-model="ruleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述：" prop="roleDesc">
        <el-input type="text" v-model="ruleForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="formUploadBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkDesc, checkNick, requestValidate } from "utils/tools.js";
import { modifyRole } from "network/power.js";
export default {
  name: "modifyRoleDialog",
  data() {
    return {
      // form表单双向绑定的数据
      ruleForm: {
        roleDesc: "",
        roleName: ""
      },
      // 验证规则
      rules: {
        roleDesc: [
          {
            validator: checkDesc,
            trigger: "blur"
          }
        ],
        roleName: [
          {
            validator: checkNick,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    DialogVisible: {
      get() {
        return this.$store.state.roleModule.modifyRoleDialogVisible;
      },
      // 由于elementUI组件会自动改写该属性。所以得添加set方法
      set() {}
    },
    // 当前角色信息
    roleInfo() {
      return this.$store.state.roleModule.currentRoleInfo;
    }
  },
  methods: {
    // 点击此按钮提交表单
    formUploadBtn() {
      // 验证是否通过
      this.$refs["ruleFormRef"].validate(isSuccess => {
        if (isSuccess) {
          // API请求需要的数据
          let option = {
            roleName: this.ruleForm.roleName,
            roleDesc: this.ruleForm.roleDesc,
            id: this.ruleForm.roleId
          };
          // 封装API请求后根据状态码执行的回调函数。
          requestValidate(modifyRole, option, 200, () => {
            // 弹框提示
            this.$Message.success("修改成功");
            // 关闭dialog
            this.$store.commit("roleModule/setModifyRoleDialog", false);
            // 更新角色列表（更新视图）
            this.$emit("getRoleList");
          });
        }
      });
    },
    dialogClose() {
      // 关闭dialog显示框
      this.$store.commit("roleModule/setModifyRoleDialog", false);
      // 清空form表单数据（如果这次有错误提醒，下次打开也不会显示）
      this.$refs["ruleFormRef"].resetFields();
    }
  },
  watch: {
    // 监听角色信息改变。并且dialog显示情况下。给data属性ruleForm重新赋值。（数据回填）
    roleInfo(val) {
      if (this.DialogVisible === true) {
        this.ruleForm = {
          ...val
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
