<template>
  <div>
    <!-- 面包屑导航 -->
    <Breadcrumb path="/home" :breadcrumbList="breadcrumbList" />

    <RightCard :powerList="powerList">

    </RightCard>
  </div>
</template>

<script>
import Breadcrumb from "components/user/Breadcrumb.vue";
import RightCard from "components/power/RightCard.vue";
import { getPowerList } from "network/power.js";
import { requestValidate } from "utils/tools";
export default {
  name: "nole",
  components: {
    Breadcrumb,
    RightCard
  },
  data(){
    return{
      breadcrumbList:['权限管理','权限列表'],
      powerList:[]
    }
  },
  created(){
    requestValidate(getPowerList,'list',200,(result)=>{
      console.log(result)
      this.powerList = result.data
    })

  }
};
</script>

<style lang="scss" scoped>
</style>
