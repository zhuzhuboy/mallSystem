<template>
  <div>
    <el-tag
      v-for="item in children"
      :key="item.id"
      :type="type"
      class="el-tag"
      :closable="closable"
      @close="tagClose(item.id)"
    >{{item.authName}}</el-tag>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    children: {
      default: []
    },
    type: {
      type: String
    },
    closable: {
      type: Boolean
    }
  },
  methods: {
    tagClose(id) {
      this.$emit("tagClose", id);
    }
  }
};
</script>



<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}
</style>
