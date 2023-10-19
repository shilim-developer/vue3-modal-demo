<template>
  <el-dialog v-model="visible" title="Shipping address">
    <div>我是测试</div>
  </el-dialog>
</template>

<script lang="ts" setup>
import useDialog from "@/hook/useDialog";

const dataInit = () => {};

const { visible, openDialog } = useDialog({
  onAfterOpen: dataInit,
});
defineExpose({
  openDialog,
});
</script>

<style scoped lang="scss"></style>
