<template>
  <el-dialog
    title="添加用户"
    :visible.sync="SetRoleDialogVisible"
    width="50%"
    center
    @close="changeDialogVisible"
  >
    <!-- 主体区域 -->
    <p>当前的用户：{{userInfo.username}}</p>
    <p>当前的角色：{{userInfo.role_name}}</p>
    <p>
      当前的角色：
      <el-select v-model="selectValue" placeholder="请选择">
        <el-option
          v-for="item in roleInfoList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        ></el-option>
      </el-select>
    </p>

    <!-- 底部区域 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeDialogVisible">取 消</el-button>
      <el-button type="primary" @click="confirmBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { distributionUserRole } from "network/user.js";
import { requestValidate } from "utils/tools";
export default {
  props: {},
  data() {
    return {
      userInfo: {},//用户信息
      roleInfoList: [],
      selectValue: ""//保存的选中的角色id
    };
  },
  computed: {
    SetRoleDialogVisible: {
      get() {
        return this.$store.state.userModule.distributionRoleDialogVisible;
      },
      set() {}
    }
  },
  created() {
    this.eventBus();
  },
  methods: {
    changeDialogVisible() {
      this.$store.commit("userModule/setDistributionRoleDialogVisible", false);
      this.selectValue = ''
    },
    confirmBtn() {
      if(!this.selectValue ){
        this.$Message.info('请分配角色')
      }
      let options={
        id:this.userInfo.id,
        rid:this.selectValue
      }
      requestValidate(distributionUserRole,options,200,(res)=>{
          this.$Message.success('分配角色成功')
          this.changeDialogVisible()
          this.$emit('getUserList')
      },(err)=>{
        this.$Message.warning('分配角色未成功')
        this.changeDialogVisible()
      });

      console.log(99);
    },
    eventBus() {
      this.$eventBus.$on("getCurrentUserInfo", user => {
        console.log(user);
        this.userInfo = user;
      });
      this.$eventBus.$on("getRoleInfoList", data => {
        this.roleInfoList = data;
      });
    }
  }
};
</script>

<style>
</style>
