import { Dialog } from "@/models/dialog";
import { ref } from "vue";

const useDialogRef = <T, U = unknown>() => {
  const dialogRef = ref<Dialog<T> & U>();

  const openDialog = (params?: T) => {
    dialogRef.value?.openDialog(params);
  };

  return {
    dialogRef,
    openDialog,
  };
};
export default useDialogRef;
