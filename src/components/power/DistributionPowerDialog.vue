<template>
  <el-dialog title="提示" :visible.sync="powerDialogVisible" width="40%" center @close="dialogClose">
    <el-tree
      :data="allPowerList"
      :props="treeProps"
      node-key="id"
      ref="treeRef"
      :default-expand-all="true"
      :default-checked-keys="thirdPowerIdArr"
      show-checkbox
    ></el-tree>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="dialogConfirmBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { roleGivePower } from "network/power.js";
import { requestValidate } from "utils/tools";
export default {
  data() {
    return {
      // el-tree数据
      treeProps: {
        children: "children",
        label: "authName"
      },
      // 当前角色信息
      roleInfo: null
    };
  },
  props: {
    // el-tree默认选中的id
    thirdPowerIdArr: {
      type: Array
    }
  },
  computed: {
    // 控制dialog显示隐藏
    powerDialogVisible: {
      set() {},
      get() {
        return this.$store.state.roleModule.distributionPowerDialogVisible;
      }
    },
    // 所有权限列表
    allPowerList() {
      return this.$store.state.roleModule.allPowerList;
    }
  },
  created() {
    // 使用eventBus实现兄弟组件间通讯。
    this.eventBus();
  },

  methods: {
    eventBus() {
      this.$eventBus.$on("getRoleInfo", data => {
        this.roleInfo = data;
      });
    },
    dialogClose() {
      // 关闭事件，则让控制视图显示为false
      this.$store.commit("roleModule/setDistributionPowerDialogVisible", false);
    },
    // 点击确认按钮
    dialogConfirmBtn() {
      // 获得选中的id
      let checkedKeys = this.$refs.treeRef.getCheckedKeys();
      // 获得半选中的id
      let halfCheckedKeys = this.$refs.treeRef.getHalfCheckedKeys();
      // 把半选中id和选中id字符串拼接起来。（请求参数之一）
      let checked = halfCheckedKeys.concat(checkedKeys).join(",");

      // 请求的参数
      let options = {
        roleId: this.roleInfo.id, //角色ID
        rids: checked //拼接起来的授权id
      };
      // 发送请求
      requestValidate(roleGivePower, options, 200, result => {
        // 成功弹框
        this.$Message.success("授权成功");
        // 关闭dialog
        this.dialogClose();
        // 重新获取用户列表。触发视图更新
        this.$emit("getRoleList");
      });
    }
  }
};
</script>

<style>
</style>
