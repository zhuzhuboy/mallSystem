<template>
  <div class="pppppp">
    <!-- 循环一级权限，作为一行 -->
    <el-row
      v-for="(firstItem,fIndex) in roleInfo.children"
      :key="firstItem.id"
      :class="{
            'border-btm':true,
            'border-top':fIndex===0?true:false,
            'v-center':true
          }"
    >
      <!-- 一级 -->
      <el-col :span="+6">
        <!-- 一级权限独占一行，所以tag组件需要包装 -->
        <!-- tag组件传递的参数。循环渲染的数组，关闭事件触发的函数，是否显示关闭图标，支持默认插槽 -->
        <RoleTableTag :children="[firstItem]" @tagClose="tagClose" :closable="true">
          <i class="el-icon-caret-right"></i>
        </RoleTableTag>
      </el-col>
      <!-- 二三级 -->
      <el-col :span="+18">
        <!-- 循环二级 -->
        <el-row
          v-for="(secondItem,secIndex) in firstItem.children"
          :key="secondItem.id"
          :class="{
                                'border-top':secIndex===0?false:true,
                                'v-center':true
                              }"
        >
          <!-- 二级 -->
          <el-col :span="+12">
            <!-- 二级的每一项 -->
            <RoleTableTag :children="firstItem.children" type="success" @tagClose="tagClose"  :closable="true">
              <i class="el-icon-caret-right"></i>
            </RoleTableTag>
          </el-col>
          <!-- 三级 -->
          <el-col :span="+12">
            <!-- 三级的每一项 -->
            <RoleTableTag
              :children="secondItem.children"
              type="warning"
              :closable="true"
              @tagClose="tagClose"
            ></RoleTableTag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RoleTableTag from "./RoleTableTag.vue";
import { deleteRole } from "network/power.js";
import { requestValidate } from "utils/tools";
export default {
  name: "expandBar",
  components: {
    RoleTableTag
  },
  props: {
    roleInfo: {
      type: Object
    }
  },
  methods: {
    // 触发了el-tag的close事件。执行删除逻辑
    async tagClose(id) {
      // 弹框提示
      let confirmResult = await this.$MessageBox
        .confirm("此操作将永久删除该选项, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .catch(err => err);
      // 字符串confirm表示确认。字符cancel表示取消
      if (confirmResult === "confirm") {
        // 接口的参数
        let options = {
          roleId: +this.roleInfo.id,
          rightId: id
        };
        // 调用删除接口
        requestValidate(
          deleteRole,
          options,
          200,
          result => {
            this.$Message.success("删除成功");
            // 把返回的数据保存到vuex中。父组件给权限重新赋值用于更新视图
            this.$store.commit('roleModule/setNewPowerData',result.data)
            // 通知父组件更新数据
            this.$emit('modifyExpandData')
          },
          err => {
            this.$Message.error("删除失败");
          }
        );
      } else if (confirmResult === "cancel") {
        this.$Message.info("取消删除");
      }
    }
  }
};
</script>

<style>
.border-btm {
  border-bottom: 1px solid #eee;
}
.border-top {
  border-top: 1px solid #eee;
}
.v-center {
  display: flex;
  align-items: center;
}
</style>
