<template>
  <el-card>
    <!-- 警告提示 -->
    <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon :closable="false"></el-alert>
    <!-- 选择商品分类区域 -->
    <el-row class="cat_opt">
      <el-col>
        <span>选择商品分类：</span>
        <!-- 级联菜单 -->
        <el-cascader
          class="el-cascader"
          v-model="cascaderValue"
          :options="allGoodsCate"
          :props="cascaderProps"
          @change="handleChange"
        ></el-cascader>
      </el-col>
    </el-row>

    <!-- 标签页+表格 -->
    <el-tabs v-model="tabActiveName" @tab-click="tabHandleClick">
      <el-tab-pane label="动态参数" name="dynamicParam">
        <el-button
          size="mini"
          type="primary"
          :disabled="isDisable"
          @click="showDialog('dynamicParam')"
        >添加参数</el-button>
        <ParamTable
          :tableData="dynamicTableData"
          :tableCol="dynamicTableCol"
          @editPropsOrParams="editPropsOrParams"
          @handleDelectProps="handleDelectProps"
        />
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="staticProp">
        <el-button
          size="mini"
          type="primary"
          :disabled="isDisable"
          @click="showDialog('staticProp')"
        >添加属性</el-button>
        <ParamTable
          :tableData="staticTableData"
          :tableCol="staticTableCol"
          @editPropsOrParams="editPropsOrParams"
          @handleDelectProps="handleDelectProps"
        />
      </el-tab-pane>
    </el-tabs>

    <!-- 添加属性/参数对话框 -->
    <addPropsOrParamsDialog
      :title="dialogTitle"
      :visible="addPorpParamdialog"
      :type="operationType"
      @changeDialogVisible="changeDialogVisible"
      @addPropOrParam="addPropOrParam"
      @modifyPropOrParam="modifyPropOrParam"
    />
  </el-card>
</template>

<script>
import {
  paramsList,
  addPropsOrParams,
  searchParamsByID,
  modifyParamsOrProps,
  deleteParamsOrProps
} from "network/goods.js";
import { requestValidate } from "utils/tools.js";
import addPropsOrParamsDialog from "./addPropsOrParamsDialog";
import ParamTable from "./ParamTable";
export default {
  components: {
    ParamTable,
    addPropsOrParamsDialog
  },
  name: "card",
  props: {
    allGoodsCate: {
      type: Array
    }
  },
  data() {
    return {
      // 级联菜单绑定的值数组
      cascaderValue: [],
      // 级联菜单配置项
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        expandTrigger: "hover"
      },
      // tabs标签页当前显示的页名称
      tabActiveName: "staticProp",
      staticTableData: [], //静态表格数据
      staticTableCol: [{ label: "属性名称", props: "attr_name", id: "1" }],//静态表格列数据
      dynamicTableData: [], //动态表格数据
      dynamicTableCol: [{ label: "参数名称", props: "attr_name", id: "1" }],//动态表格列数据
      addPorpParamdialog: false, //控制添加属性或参数对话框显示或隐藏的数据
      dialogTitle: "", //dialog的title
      operationType: "",//对话框的执行逻辑的方式。（告诉对话框修改还是新增）
      currentPropsOrParams: {} //当前修改的属性或参数对象，根据id获取的最新数据
    };
  },
  computed: {
    isDisable() {
      let len = this.cascaderValue.length;
      return len !== 3;
    },
    // 分类id
    id() {
      let len = this.cascaderValue.length;
      if (len == 3) {
        return this.cascaderValue[len - 1];
      }
      return null;
    },
    attr_sel() {
      return this.tabActiveName === "staticProp" ? "only" : "many";
    }
  },
  methods: {
    // 子组件编辑按钮触发的事件
    editPropsOrParams(props) {
      let attr_sel = props.attr_sel;
      let attrId = props.attr_id;
      let val;
      if (attr_sel === "many") {
        val = "dynamicParam";
      } else {
        val = "staticProp";
      }
      this.modifyDialog(val);
      let options = {
        id: this.id, //分类id,
        attrId, //属性id
        attr_sel
      };
      requestValidate(searchParamsByID, options, 200, res => {
        this.currentPropsOrParams = res.data;
        this.$eventBus.$emit("formDataChange", res.data.attr_name);
      });
    },
    // 控制修改对话框和文本内容
    modifyDialog(val) {
      this.addPorpParamdialog = true;
      if (val === "dynamicParam") {
        this.dialogTitle = "修改动态参数";
      } else {
        this.dialogTitle = "修改静态属性";
      }
      this.operationType = "modify";
    },
    // 修改属性或参数请求和成功的结果
    modifyPropOrParam(val) {
      let options = {
        id: this.id,
        attrId: this.currentPropsOrParams.attr_id,
        attr_name: val,
        attr_sel: this.currentPropsOrParams.attr_sel
      };
      requestValidate(modifyParamsOrProps, options, 200, res => {
        this.addPorpParamdialog = false;
        this.getParamsData();
        this.$Message.success(res.meta.msg);
      });
    },
    async handleDelectProps(props){
      let sel = props.attr_sel;
      let text;
      if (sel === "only") {
        text = "此操作将永久删除该属性, 是否继续?";
      } else if (sel === "many") {
        text = "此操作将永久删除该参数, 是否继续?";
      }
      let confirmResult = await this.$MessageBox
        .confirm(text, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .catch(err => err);
      if (confirmResult === "confirm") {
        let options = {
          id: props.cat_id,
          attrid: props.attr_id
        };
        requestValidate(deleteParamsOrProps, options, 200, res => {
          this.$Message.success(res.meta.msg)
          this.getParamsData()
        });
      }
    },
    // 级联菜单选择框发生改变
    handleChange() {
      // 执行获取params数据并赋值到data中
      this.getParamsData();
    },
    // 获取params数据并赋值到data中
    getParamsData() {
      // 判断如果没有选中三级选项，则不进行操作
      let len = this.cascaderValue.length;
      if (len !== 3) {
        return;
      }
      // API请求的参数选项
      let options = {
        id: this.id,
        sel: this.tabActiveName === "staticProp" ? "only" : "many"
      };
      requestValidate(paramsList, options, 200, res => {
        // 判断当前是静态属性标签页，则给静态表格数据赋值
        if (this.tabActiveName === "staticProp") {
          this.staticTableData = res.data;
        } else {
          // 判断当前是动态属性标签页，则给动态表格数据赋值
          this.dynamicTableData = res.data;
        }
      });
    },
    // 标签页点击事件
    tabHandleClick() {
      // 执行获取params数据并赋值到data中
      this.getParamsData();
    },
    // 控制对话框显示。和对话框文本内容
    showDialog(val) {
      this.addPorpParamdialog = true;
      if (val === "dynamicParam") {
        this.dialogTitle = "添加动态参数";
      } else {
        this.dialogTitle = "添加静态属性";
      }
      this.operationType = "add";
    },
    // 对话框的设置（隐藏）
    changeDialogVisible(val) {
      this.addPorpParamdialog = val;
    },
    // 添加属性或参数请求
    addPropOrParam(val) {
      let options = {
        id: this.id,
        attr_name: val,
        attr_sel: this.attr_sel
      };
      requestValidate(
        addPropsOrParams,
        options,
        201,
        res => {
          // 请求成功了
          // 关闭对话框
          this.addPorpParamdialog = false;
          // 重新获取数据
          this.getParamsData();
          this.$Message.success("添加成功");
        },
        res => {
          this.addPorpParamdialog = false;
          this.$Message.error(res.meta.msg);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.cat_opt {
  margin-top: 20px;
}
.el-cascader{
  width: auto;
}
</style>
