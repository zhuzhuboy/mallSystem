<template>
  <el-card>
    <el-table :data="powerList" stripe border style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径" ></el-table-column>
      <el-table-column prop="level"  label="权限等级">
        <template v-slot:default="slotProps">
          <el-tag :type="tagType(slotProps.row.level)" size="medium">{{+slotProps.row.level+1}}级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name:'card',
  props: {
    powerList: {
      type: Array
    }
  },
  created(){
    console.log(this.powerList)
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
