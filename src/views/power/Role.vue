<template>
  <div>
    <Breadcrumb path="/home" :breadcrumbList="breadcrumbList" />
    <!-- 角色卡片 -->
    <RoleCard :roleList="roleList" @getRoleList="getRoleList"
    @getThirdPowerIdArr="getThirdPowerIdArr"
     />

    <!-- 修改角色对话框 -->
    <ModifyRoleDialog @getRoleList="getRoleList" />

    <!-- 分配权限对话框 -->
    <DistributionPowerDialog
    :thirdPowerIdArr="thirdPowerIdArr"
    @getRoleList="getRoleList"
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
      // 得到三级权限id数组。el-tree默认选中的数组
      thirdPowerIdArr:[]
    };
  },
  methods: {
    // 子组件通知父组件执行
    getThirdPowerIdArr(arr){
      this.thirdPowerIdArr=arr
    },
    getRoleList() {
      requestValidate(roleList, "", 200, result => {

        this.roleList = result.data;
      });
    },
  },
  created() {
    this.getRoleList();
  }
};
</script>

<style lang="scss" scoped>
</style>
