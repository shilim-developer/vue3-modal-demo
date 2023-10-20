<template>
  <el-dialog v-model="visible" title="Ref弹窗">
    <div>{{ data.content }}</div>
  </el-dialog>
</template>

<script lang="ts" setup>
import useDialog from "@/hook/useDialog";
import { Ref, ref } from "vue";

export interface RefDialogProps {
  content: string;
}

const data: Ref<RefDialogProps> = ref({
  content: "",
});

const dataInit = (props?: RefDialogProps) => {
  // 处理传递的数据
  if (props) {
    data.value = props;
  }
};

const { visible, openDialog } = useDialog<RefDialogProps>({
  onAfterOpen: dataInit,
});
defineExpose({
  openDialog,
});
</script>

<style scoped lang="scss"></style>
