<template>
  <el-config-provider namespace="shilim">
    <el-button type="primary" @click="openRefDialog">打开弹窗</el-button>
    <el-button type="primary" @click="openCommandDialog"
      >打开命令弹窗</el-button
    >
    <RefDialog ref="refDialog" />
  </el-config-provider>
</template>

<script setup lang="ts">
import RefDialog from "./components/RefDialog.vue";
import CommandDialog from "./components/CommandDialog.vue";
import useCommandComponent from "./hook/useCommandComponent";
import useDialogRef from "./hook/useDialogRef";

const { dialogRef: refDialog, openDialog: openRefDialog } = useDialogRef();

const commandDialog = useCommandComponent(CommandDialog);
const openCommandDialog = () => {
  commandDialog({
    visible: true,
  });
};
</script>
<style scoped></style>
