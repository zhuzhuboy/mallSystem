<template>
  <el-dialog
    title="修改用户信息"
    :visible.sync="modifyDialogVisible"
    width="50%"
    @close="dialogClose"
    center
  >
    <el-form
      label-position="right"
      label-width="80px"
      :model="formUserInfo"
      :rules="editRules"
      ref="editFormRef"
    >
      <el-form-item label="用户名：">
        <el-input v-model="formUserInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="formUserInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机：" prop="mobile">
        <el-input v-model="formUserInfo.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelEditUserBtn">取 消</el-button>
      <el-button type="primary" @click="editUserBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import { checkEmail, checkPhone, requestValidate } from "utils/tools.js";
import { editUserInfo } from "network/user.js";
export default {
  data() {
    return {
      formUserInfo: {
        username: "",
        mobile: "",
        email: ""
      },
      editRules: {
        email: [
          {
            validator: checkEmail,
            trigger: "blur"
          }
        ],
        mobile: [
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    modifyDialogVisible: {
      get() {
        return this.$store.state.userModule.modifyDialogVisible;
      },
      set() {}
    },
    userInfo() {
      return this.$store.state.userModule.currentUserInfo;
    }
  },
  watch: {
    modifyDialogVisible(val) {
      if (val === true) {
        console.log(this.userInfo);

        this.formUserInfo = {
          ...this.userInfo
        };
      }
    }
  },
  methods: {
    // 对话框关闭事件
    dialogClose() {
      // 关闭先清空，避免错误提示再下次打开时候出现
      this.$refs.editFormRef.resetFields();
      this.$store.commit("userModule/setModifyDialogVisible", false);
    },
    //取消修改按钮
    cancelEditUserBtn() {
      this.$store.commit("userModule/setModifyDialogVisible", false);
    },
    async editUserBtn() {
      this.$refs.editFormRef.validate(async isSucess => {
        // eleUI自带验证功能。
        if (isSucess) {
          // API需要的参数
          let option = {
            // 拿到当前用户ID
            id: this.userInfo.id,
            // input双向绑定的数据
            email: this.formUserInfo.email,
            mobile: this.formUserInfo.mobile
          };
          // 发送请求，参数分别是：请求API，API所需要的参数。判断成功的状态码，回调函数
          requestValidate(
            editUserInfo,
            option,
            200,
            () => {
              // 关闭对话框
              this.$store.commit("userModule/setModifyDialogVisible", false);
              // 更新学生列表
              this.$emit("getUserList");
              this.$Message.success("修改成功");
            },
            () => {
              this.$Message.error("修改失败");
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
