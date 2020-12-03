<template>
  <el-dialog title="提示" :visible.sync="powerDialogVisible" width="30%" center @close="dialogClose">
<el-tree :data="allPowerList" :props="treeProps" @check="handleNodeClick"
node-key="id"
:default-expand-all="true"
:default-checked-keys="thirdPowerIdArr"
show-checkbox></el-tree>

    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      treeProps: {
        children: "children",
        label: "authName"
      },
      defaultKeys:['104','115','121','148']
    };
  },
  props:{
    roleList:{
      type:Array
    },
    thirdPowerIdArr:{
      type:Array
    }
  },
  computed: {
    powerDialogVisible: {
      set() {},
      get() {
        return this.$store.state.roleModule.distributionPowerDialogVisible;
      }
    },
    allPowerList() {
      return this.$store.state.roleModule.allPowerList;
    }
  },
  methods: {
    dialogClose() {
      // 关闭事件，则让控制视图显示为false
      this.$store.commit("roleModule/setDistributionPowerDialogVisible", false);
    },
    handleNodeClick(e,b){
      console.log(e,this.thirdPowerIdArr,b)
    }
  }
};
</script>

<style>
</style>
