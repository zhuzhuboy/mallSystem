<template>
  <el-card>
    <el-table :data="roleList" stripe border style="width: 100%">
      <el-table-column type="expand" label width="60"></el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column prop="level" label="操作">
        <template v-slot="slotProps">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="modifyRole(slotProps.row.id)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteRole(slotProps.row.id)"
          >删除</el-button>
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="deleteUser(slotProps.row.id)"
          >分配权限</el-button>
          <!-- <el-tooltip content="分配角色" placement="top">
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="assignRole(slotProps.row)"
          >分配权限</el-button>
          </el-tooltip>-->
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { queryRoleById,deleteRole } from "network/power.js";
import { requestValidate } from "utils/tools";
export default {
  name: "roleCard",
  props: {
    roleList: {
      type: Array
    }
  },

  methods: {
    tagType(val) {
      if (val == 0) {
        return "";
      } else if (val == 1) {
        return "info";
      } else if (val == 2) {
        return "warning";
      }
    },
    modifyRole(id) {
      this.$store.commit("roleModule/setModifyRoleDialog", true);
      //通过id获得用户信息,把用户信息保存到vuex中。
      requestValidate(queryRoleById, id, 200, result => {
        this.$store.commit("roleModule/setCurrentRoleInfo", result.data);
      });
    },
    async deleteRole(id) {
      const confirmResult = await this.$MessageBox
        .confirm("此操作将永久删除该角色, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .catch(err => err);
      // confirmResult结果为字符串confirm表示确认。为字符串cancel表示取消
      if (confirmResult === "confirm") {
        //确认，调用请求顺带验证
          requestValidate(
          deleteRole,
           id ,
          200,
          () => {
            this.$emit("getRoleList");
            this.$Message.success("删除成功");
          },
          () => {
            this.$Message.error("删除失败,请联系管理员");
          }
        );
      } else {
        // 取消，则提示
        this.$Message.info("取消删除操作");
      }
    }
  }
};
</script>

<style>
.power-btn-blue {
  background-color: rgba(53, 115, 231, 0.2);
  color: rgb(53, 115, 231);
}
.power-btn-green {
  background-color: rgba(45, 228, 115, 0.2);
  color: rgb(45, 228, 11);
}
.power-btn-origin {
  background-color: rgba(224, 196, 36, 0.2);
  color: rgb(224, 196, 36);
}
</style>
