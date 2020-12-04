<template>
  <el-card>
    <el-table :data="roleList" stripe border style="width: 100%">
      <!-- 扩展栏 -->
      <el-table-column type="expand" label width="60">
        <!-- 作用域插槽 -->
        <template v-slot="expandProps">
          <!-- 扩展栏显示组件 -->
          <ExpandBar :roleInfo="expandProps.row" @modifyExpandData="expandChange(expandProps.row)" />
        </template>
      </el-table-column>
      <!-- 索引 -->
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
            @click="distributionPower(slotProps.row)"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { queryRoleById, deleteRole, AllPowerList } from "network/power.js";
import ExpandBar from "./ExpandBar.vue";
import { requestValidate } from "utils/tools";

export default {
  name: "roleCard",
  components: {
    ExpandBar
  },
  props: {
    // 角色信息。el-table使用（:data="roleList"）
    roleList: {
      type: Array
    }
  },
  computed: {
    // 得到
    newData() {
      return this.$store.state.roleModule.newPowerData;
    }
  },
  methods: {
    // 修改角色信息
    modifyRole(id) {
      this.$store.commit("roleModule/setModifyRoleDialog", true);
      //通过id获得用户信息,把用户信息保存到vuex中。
      requestValidate(queryRoleById, id, 200, result => {
        this.$store.commit("roleModule/setCurrentRoleInfo", result.data);
      });
    },
    // 删除角色
    async deleteRole(id) {
      // 删除提示框
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
          id,
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
    },
    // 分配权限按钮
    distributionPower(data) {
      console.log(data)
      // 通过eventBus进行兄弟组件传递信息
      this.$eventBus.$emit("getRoleInfo", data);

      // 存储第三级权限所有id值数组
      let arr = [];
      // 递归
      console.log(arr)

      this.digui(data, arr);
      // 去除数据undefined。
      arr = arr.filter(res => res != undefined);
      // 通知父组件存储数组
      this.$emit("getThirdPowerIdArr", arr);
      // 控制对话框显示
      this.$store.commit("roleModule/setDistributionPowerDialogVisible", true);
      requestValidate(AllPowerList, "tree", 200, result => {
        // 状态码是200后，把所有权限列表存储到vuex中。其他组件获取用于显示
        this.$store.commit("roleModule/setAllPowerList", result.data);
      });
    },
    // 子组件触发事件： 参数是作用域插槽数据。也就是任务角色权限数据（修改el-table-column扩展栏里面作用域插槽里面的值)
    expandChange(oldRolePowerData) {

      // 当前角色权限数据重新赋值，赋值为从vuex中获得当前角色下最新的权限数据,该数据是被某个选项被删除，返回的最新数据
      oldRolePowerData.children = this.newData;
    },
    // 递归函数。
    digui(obj, arr = []) {
      // 判断对象children是否存在和是否是数组，如果不是则是最后一层。返回这个对象的id
      if (obj.children===undefined) {
        return obj.id;
      }
      // 递归往数组添加id
      obj.children.forEach(item => {
        arr.push(this.digui(item, arr));
      });
    }
  }
};
</script>

<style>
</style>
