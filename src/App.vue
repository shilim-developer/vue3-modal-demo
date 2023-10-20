<template>
  <el-config-provider namespace="shilim">
    <el-button type="primary" @click="openCommandDialog">
      打开命令弹窗
    </el-button>
    <el-button
      type="primary"
      @click="openRefDialog({ content: '我是Ref弹窗' })"
    >
      打开Ref弹窗
    </el-button>
    <el-button type="primary" @click="openDialogManageDialog">
      打开dialogManager弹窗
    </el-button>
    <el-button type="primary" @click="openDialogManageDialogCache">
      打开dialogManager弹窗(缓存)
    </el-button>
    <RefDialog ref="refDialog" />
    <DialogManager />
  </el-config-provider>
</template>

<script setup lang="ts">
import RefDialog, { RefDialogProps } from "./components/RefDialog.vue";
import CommandDialog from "./components/CommandDialog.vue";
import DialogManagerDialog from "./components/DialogManagerDialog.vue";
import useCommandComponent from "./hook/useCommandComponent";
import useDialogRef from "./hook/useDialogRef";
import { createDialogManager } from "./hook/createDialogManager";

const commandDialog = useCommandComponent(CommandDialog);
const openCommandDialog = () => {
  commandDialog({
    visible: true,
  });
};

const { dialogRef: refDialog, openDialog: openRefDialog } =
  useDialogRef<RefDialogProps>();

const DialogManager = createDialogManager();
const openDialogManageDialog = () => {
  DialogManager.open(DialogManagerDialog, {
    content: "我是DialogManagerDialog弹窗",
  });
};
const openDialogManageDialogCache = () => {
  DialogManager.openInCache(
    DialogManagerDialog,
    {
      content: "我是DialogManagerDialog弹窗",
    },
    "DialogManagerDialogCache"
  );
};
</script>
<style scoped></style>
