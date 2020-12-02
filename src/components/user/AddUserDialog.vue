<template>
  <!-- 添加用户对话框 -->

  <el-dialog
    title="添加用户"
    :visible.sync="centerDialogVisible"
    width="30%"
    center
    @close="changeDialogVisible"
  >
    <!-- 主体区域 -->
    <el-form
      :model="addForm"
      :rules="addFormRules"
      ref="addFormRef"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名：" prop="user">
        <el-input v-model="addForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="addForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机：" prop="phone">
        <el-input v-model="addForm.phone"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeDialogVisible">取 消</el-button>
      <el-button type="primary" @click="addUserBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import { addUserRequest } from "network/user.js";
import {
  checkUser,
  checkEmail,
  checkPhone,
  checkPassword
} from "utils/tools.js";
export default {
  name: "addUserDialog",
  data() {
    // 验证用户名，自定义验证
    return {
      // form表单中绑定的数据
      addForm: {
        user: "",
        password: "",
        email: "",
        phone: ""
      },
      // 表单验证
      addFormRules: {
        user: [
          {
            validator: checkUser,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: checkEmail,
            trigger: "blur"
          }
        ],
        phone: [
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    // vuex保存的是否显示dialog数据。由于elementUI会修改该数据。所以设置了set属性
    centerDialogVisible: {
      get() {
        // 返回vuex保存的数据
        return this.$store.state.userModule.centerDialogVisible;
      },
      set(val) {}
    }
  },
  watch: {
    // 监听数据
    centerDialogVisible(val) {
      // 当dialog显示并且父组件中addFormRef等于null时候。向父组件中传递过去。在nextTick中执行
      if (val === true && this.$parent.addFormRef === null) {
        this.$nextTick(() => {
          this.$emit("addFormRefFunc", this.$refs.addFormRef);
        });
      }
    }
  },
  methods: {
    changeDialogVisible() {
      // 由于vuex使用了module模块，并且设置了命名空间。所以在使用mutation方法时候在前面加上 命名空间/
      this.$store.commit("userModule/setDialogVisible", false);
    },
    // form表单里面确认按钮
    addUserBtn() {
      // 验证表单是否通过
      this.$refs.addFormRef.validate(async isSucess => {
        if (isSucess) {
          // 发送请求
          let result = await addUserRequest(this.addForm);
          if (result.meta.status === 201) {
            // 成功，弹出消息
            this.$Message.success(result.meta.msg);
            // 关闭dialog
            this.$store.commit("userModule/setDialogVisible", false);
            // 重新获取用户列表
            this.$emit("getUserList");
          } else {
            // 弹出失败消息
            this.$Message.warning(result.meta.msg);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
