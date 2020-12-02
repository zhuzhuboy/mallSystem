<template>
  <el-table :data="users" stripe border style="width: 100%">
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
    <el-table-column prop="mobile" width="200" label="电话"></el-table-column>
    <el-table-column prop="role_name" label="角色"></el-table-column>
    <el-table-column prop="mg_state" label="状态">
      <!-- 作用于插槽，使用switch组件双向数据绑定作用域插槽里面的row属性的mg_state -->
      <template v-slot:default="slotProps">
        <el-switch
          v-model="slotProps.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchChange(slotProps.row)"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot="slotProps">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="modifyUser(slotProps.row.id)"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="mini"
          @click="deleteUser(slotProps.row.id)"
        ></el-button>
        <el-tooltip content="分配角色" placement="top">
          <el-button
            type="primary"
            icon="el-icon-setting"
            size="mini"
            @click="assignRole(slotProps.row)"
          ></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {
  modifyUserState,
  queryUserInfo,
  deleteUserInfo,
  assignUserRole,
  roleList
} from "network/user.js";
import { debounce, requestValidate } from "utils/tools";
export default {
  name: "cardTable",
  data() {
    return {
      debChangeUserState() {} //初始化为函数。在created函数中赋值为debounce防抖函数。以便在频繁改变状态时所用
    };
  },
  props: {
    users: {
      type: Array
    },
    status: {
      type: Array
    }
  },
  methods: {
    // 切换状态的时候，执行防抖函数。
    switchChange(info) {
      this.debChangeUserState(info);
    },
    async modifyUser(id) {
      let result = await queryUserInfo(id);
      console.log(result);
      if (result.meta.status === 200) {
        console.log("cg", result);
        // vuex 存储通过ID查询到的用户信息
        this.$store.commit("userModule/setCurrentUserInfo", result.data);
      }

      this.$store.commit("userModule/setModifyDialogVisible", true);
    },
    async deleteUser(id) {
      // elementUI弹框
      const confirmResult = await this.$MessageBox
        .confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .catch(err => err);
      // confirmResult结果为字符串confirm表示确认。为字符串cancel表示取消
      if(confirmResult==='confirm'){
        // 确认，调用请求顺带验证
        requestValidate(
        deleteUserInfo,
        { id },
        200,
        () => {
          this.$emit("getUserList");
          this.$Message.success("删除成功");
        },
        () => {
          this.$Message.error("删除失败,请联系管理员");
        }
      );
      }else{
        // 取消，则提示
        this.$Message.info("取消删除操作");
      }


    },
    assignRole(user) {
      requestValidate(
        assignUserRole,
        {
          id: user.id,
          rid: "174",
          mobile: user.mobile,
          email: user.email
        },
        200,
        () => {
          this.$emit("getUserList");
          this.$Message.success("设置角色成功");
        },
        () => {
          this.$Message.error("设置角色成功失败");
        }
      );
    }
  },
  created() {
    // 在creatd声明周期中，初始化debChangeUserState函数。该函数作用是防抖
    this.debChangeUserState = debounce(async data => {
      let result = await modifyUserState(
        `users/${data.id}/state/${data.mg_state}`
      );
      if (result.meta.status === 200) {
        this.$Message.success(result.meta.msg);
      } else {
        // 当前状态码不是200
        //找到status属性id和当前改变row的id相等的那一项,得到status属性值。（即获取后未改变的值）
        let curStatus = this.status.find(item => {
          return item.id === data.id;
        }).status;
        // 失败，赋回原先的值。
        data.mg_state = curStatus;
        // 弹框提醒
        this.$Message.warning(result.meta.msg);
      }
    }, 200);
  }
};
</script>

<style>
</style>
