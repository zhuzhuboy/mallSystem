<template>
  <div>
    <Breadcrumb path="/home" :breadcrumbList="breadcrumbList" />
    <RoleCard :roleList="roleList" @getRoleList="getRoleList"
    @updateRoleList="updateRoleList"
    @getThirdPowerIdArr="getThirdPowerIdArr"
     />
    <!-- 修改角色对话框 -->
    <ModifyRoleDialog @getRoleList="getRoleList" />

    <!-- 分配权限对话框 -->
    <DistributionPowerDialog :roleList="roleList"
    :thirdPowerIdArr="thirdPowerIdArr"
     />
  </div>
</template>

<script>
import Breadcrumb from "components/user/Breadcrumb.vue";
import RoleCard from "components/power/RoleCard.vue";
import ModifyRoleDialog from "components/power/ModifyRoleDialog.vue";
import DistributionPowerDialog from "components/power/DistributionPowerDialog.vue";
import { roleList } from "network/power.js";
import { requestValidate } from "utils/tools";

export default {
  name: "role",
  components: {
    Breadcrumb,
    RoleCard,
    ModifyRoleDialog,
    DistributionPowerDialog
  },
  data() {
    return {
      breadcrumbList: ["权限管理", "角色列表"],
      roleList: [],
      thirdPowerIdArr:[]
    };
  },
  methods: {
    getThirdPowerIdArr(arr){
      this.thirdPowerIdArr=arr
    },
    getRoleList() {
      requestValidate(roleList, "", 200, result => {
        this.updateRoleList(result.data)
      });
    },
    updateRoleList(data) {
      this.roleList = data;
    }
  },
  created() {
    this.getRoleList();
  }
};
</script>

<style lang="scss" scoped>
</style>
