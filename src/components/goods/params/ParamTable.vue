<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column type="expand">
      <template v-slot="slotProps">
        <!-- for循环 -->
        <el-tag
          v-for="(cateVal,index) in slotProps.row.attr_vals"
          :key="index"
          class="el-tag"
          closable
          @close="handleClose(slotProps.row,index)"
        >{{cateVal}}</el-tag>
        <!-- input框 -->
        <el-input
          class="input-new-tag"
          v-if="slotProps.row.inputVisible"
          v-model="slotProps.row.inputVal"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm(slotProps.row,'enter')"
          @blur="handleInputConfirm(slotProps.row,'blur')"
        />

        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput(slotProps.row)"
        >添加新内容</el-button>
      </template>
    </el-table-column>
    <el-table-column type="index" label="#" width="50"></el-table-column>

    <el-table-column
      v-for="item in tableCol"
      :key="item.id"
      :prop="item.props"
      :label="item.label"
      width="180"
    ></el-table-column>
    <el-table-column label="操作">
      <template v-slot="scopeProps">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scopeProps.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="deleteProps(scopeProps.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteParamsOrProps, editSubmitParams } from "network/goods.js";
import { requestValidate } from "utils/tools.js";
export default {
  name: "paramTable",

  props: {
    tableData: {
      type: Array
    },
    tableCol: {
      type: Array
    }
  },
  methods: {
    edit(props) {
      this.$emit("editPropsOrParams", props);
    },
    deleteProps(props) {
      this.$emit("handleDelectProps", props);
    },
    // 控制input显示
    showInput(row) {
      // 先控制视图显示
      row.inputVisible = true;
      // 然后在调用dom渲染完成后的回调函数
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // input失去焦点和确认，发送请求
    handleInputConfirm(row, flag) {
      if (row.inputVal && row.inputVal.trim() !== "") {
        // 保存
        row.attr_vals.push(row.inputVal);
        // input不显示
        row.inputVisible = false;
        // v-model值置空
        row.inputVal = "";
        this.modifyAttrValue(row);
      }
    },
    // 修改属性值API。新增可以调用，删除也可以调用
    modifyAttrValue(row) {
      let options = {
        id: row.cat_id,
        attrId: row.attr_id,
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(" ")
      };
      requestValidate(editSubmitParams, options, 200, res => {
        // 成功弹框
        this.$Message.success(res.meta.msg);
      });
    },
    // tag关闭
    handleClose(row, index) {
      // 先截取掉不要
      row.attr_vals.splice(index, 1);
      // 调用请求接口
      this.modifyAttrValue(row);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 100px;
}
</style>
