<template>
  <div>
    <Breadcrumb path="/home" :breadcrumbList="breadcrumbList" />
    <RoleCard :roleList="roleList" @getRoleList="getRoleList" />
    <!-- 修改角色对话框 -->
    <ModifyRoleDialog @getRoleList="getRoleList" />
  </div>
</template>

<script>
import Breadcrumb from "components/user/Breadcrumb.vue";
import RoleCard from "components/power/RoleCard.vue";
import ModifyRoleDialog from "components/power/ModifyRoleDialog.vue";
import { roleList } from "network/power.js";
import { requestValidate } from "utils/tools";

export default {
  name: "role",
  components: {
    Breadcrumb,
    RoleCard,
    ModifyRoleDialog
  },
  data() {
    return {
      breadcrumbList: ["权限管理", "角色列表"],
      roleList: []
    };
  },
  methods: {
    getRoleList() {
      requestValidate(roleList, "", 200, result => {
        this.roleList = result.data;
      });
    }
  },
  created() {
    this.getRoleList()
  }
};
</script>

<style lang="scss" scoped>
</style>
