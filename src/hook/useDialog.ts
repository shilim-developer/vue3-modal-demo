import { ref } from "vue";

interface UseDialogParams<T> {
  onBeforeOpen?: (params?: T) => void;
  onAfterOpen?: (params?: T) => void;
  onBeforeClose?: () => void;
  onAfterClose?: () => void;
}

const useDialog = <T>(params?: UseDialogParams<T>) => {
  const visible = ref<boolean>(false);

  const openDialog = (openParams?: T) => {
    params?.onBeforeOpen && params.onBeforeOpen(openParams);
    visible.value = true;
    params?.onAfterOpen && params.onAfterOpen(openParams);
  };

  const closeDialog = () => {
    params?.onBeforeClose && params.onBeforeClose();
    visible.value = false;
    params?.onAfterClose && params.onAfterClose();
  };

  return {
    visible,
    openDialog,
    closeDialog,
  };
};
export default useDialog;
