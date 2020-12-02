<template>
  <div class="user">
    <!-- 面包屑 -->
    <Breadcrumb />
    <!-- 卡片区域 -->
    <Card
      :queryInfo="queryInfo"
      :users="users"
      :total="total"
      :status="status"
      :addFormRef="addFormRef"
      @getUserList="getUserList"
      @changeQueryInfo="changeQueryInfo"
    />

    <!-- 添加用户对话框 -->
    <AddUserDialog @getUserList="getUserList" @addFormRefFunc="addFormRefFunc" />

    <!-- 修改用户对话框 -->
    <ModifyUserDialog @getUserList="getUserList" />
    <input type="file" @change="uploadFile" ref="input" />
  </div>
</template>

<script>
import Breadcrumb from "components/user/Breadcrumb.vue";
import Card from "components/user/Card.vue";
import AddUserDialog from "components/user/AddUserDialog.vue";
import ModifyUserDialog from "components/user/ModifyUserDialog.vue";
import { userList } from "network/user.js";
import { modifyUserState } from "network/user.js";
import { debounce } from "utils/tools";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "user",
  computed: {
    ...mapState("moduleB", {
      names: "name"
    })
  },
  components: {
    Breadcrumb,
    Card,
    AddUserDialog,
    ModifyUserDialog
  },
  created() {
    console.log(this.names, "在User的created生命周期函数");
    //  得到用户列表
    this.getUserList();
  },
  data() {
    return {
      name: "cuizhuo",
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      users: [],
      status: [], //获取用户后保存状态和id的数组
      addFormRef: null //子组件的ref引用。因为子组件（A）兄弟组件（B）需要用到(A)方法。所以提升在父组件中
    };
  },
  methods: {
    uploadFile(e) {
      console.log(e.target.files);
      const file = this.$refs.input.files[0];
      window.form = new FormData();
      form.append("file", file);
      console.log(form);
      console.log(this.$refs.input.files[0]);
    },
    ...mapActions("moduleB", ["setNameAsync"]),
    // 改变queryInfo
    changeQueryInfo(obj) {
      const queryInfo = this.queryInfo;
      this.queryInfo = {
        ...queryInfo,
        ...obj
      };
    },
    // 得到学生列表
    async getUserList() {
      const result = await userList(this.queryInfo);
      //获取用户后保存状态和id的数组
      result.data.users.forEach(info => {
        this.status.push({
          status: info.mg_state,
          id: info.id
        });
      });
      if (result.meta.status === 200) {
        //请求成功后赋值
        this.total = result.data.total;
        this.users = result.data.users;
      }
    },
    // 修改addFormRef值。子传父，父传其他儿子
    addFormRefFunc(ref) {
      this.addFormRef = ref;
    }
  }
};
</script>

<style lang="scss" scoped>
.card-pagination {
  margin-top: 20px;
}
</style>
