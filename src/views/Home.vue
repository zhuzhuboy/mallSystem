<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header height="80px">
      <!-- logo -->
      <div class="header-logo-container">
        <img :src="logo" alt="logo" />
        <span>电商后台管理系统</span>
      </div>
      <!-- 退出按钮 -->
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse? '64px' : '200px'">
        <!-- 展开按钮 -->
        <div class="toggle-button iconfont icon-zhankai" @click="toggleCollapse"></div>
        <!-- 菜单 -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单，通过请求到menus遍历生成 -->
          <el-submenu
            :index="`${index+1}`"
            v-for="(firMenu,index) in menus"
            :key="firMenu.id"
            class="fff"
          >
            <template slot="title">
              <i class="iconfont" :class="{[firMenuIcon[index]]:true}"></i>
              <span>{{firMenu.authName}}</span>
            </template>
            <el-menu-item-group>
              <!-- 二级菜单 通过一级菜单的children属性遍历生成-->
              <el-menu-item
                :index="`/${secMenu.path}`"
                v-for="(secMenu) in firMenu.children"
                :key="secMenu.id"
                @click="changeActivePath(`/${secMenu.path}`)"
              >
                <i class="el-icon-menu"></i>
                {{secMenu.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import logo from "assets/logo.jpg";
import { menuList } from "network/menu.js";
export default {
  name: "Home",
  data() {
    return {
      logo, // 图片
      menus: [], // 侧边栏菜单列表，
      //  自定义图标类名。按照功能顺序编写（硬编码）
      firMenuIcon: [
        "icon-yonghu",
        "icon-quanxian",
        "icon-shangpin",
        "icon-dingdan-",
        "icon-data"
      ],
      isCollapse:false,//是否展开
      activePath:''//当前二级菜单映射的路径
    };
  },
  components: {},
  methods: {
    // 退出
    logout() {
      // 会话移除token
      window.sessionStorage.removeItem("token");
      // 跳转登录页面
      this.$router.replace("/login");
    },
    // 得到菜单列表
    async getMenuList() {
      const result = await menuList(); // 请求
      // 如果状态不是200并且不为400（就是token无效）。则弹出消息。并return
      if (result.meta.status !== 200 && result.meta.status !== 400) {
        this.$Message({
          message: result.meta.msg,
          type: "warning"
        });
        return;
      } else if (result.meta.status === 400) {
        // 是400话，是token问题，调用清除token并且跳转到登录的函数
        this.clearToken(result.meta.status);
        return;
      }
      this.menus = result.data;
    },
    // 清除token，并且跳转到登录页面，弹出消息的函数
    clearToken() {
      this.$Message({
        message: "请登录",
        type: "warning"
      });
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    // 得到用户列表

    // 展开
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    },
    // 更新当前路径
    changeActivePath(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },
  async created() {
    this.getMenuList();
    this.activePath= window.sessionStorage.getItem('activePath')
  },
  // 组件销毁的时候清除sessionStorage存储的activePath数据
  destroyed(){
    window.sessionStorage.removeItem('activePath')
  }
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     console.log('hello', vm)
  //     const token = window.sessionStorage.token
  //     if (vm.$store.state.token !== token) {
  //       next('login')
  //     }
  //   })
  // }
};
</script>



<style lang="scss" scoped>

.iconfont {
  padding-right: 6px;
}

.el-menu-item-group__title {
  padding: 0;
}
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  background-color: #373f41;

  .header-logo-container {
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 20px;
    color: #9fb8bc;
    img {
      width: 80px;
      height: 100%;
      border-radius: 50%;
    }
    span {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
.el-aside {
  background-color: #333744;

  .toggle-button {
    display: flex;
    justify-content: center;
    line-height: 30px;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>
