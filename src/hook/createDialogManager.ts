import DynamicDialog from "@/components/DynamicDialog.vue";
import { DialogComponent } from "@/models/dialog";
import { ComponentProps } from "@/types/vue-type-helper";
import {
  shallowReactive,
  type Component,
  type ComponentOptionsBase,
  reactive,
  h,
} from "vue";

export interface ComponentStore<T extends Component> {
  component: Component; // 模态框组件
  props: (ComponentProps<T> extends any ? {} : ComponentProps<Component>) &
    DialogComponent.Props; // 模态框参数
  key?: string; // 唯一标识
  isCache?: boolean; // 是否缓存
}

export const createDialogManager = () => {
  const componentStore: { [key: string]: ComponentStore<Component> } =
    shallowReactive({});

  const setDialog = <T extends Component>(data: ComponentStore<T>) => {
    // 设置key
    const componentKey =
      data.key ||
      data.component.name ||
      (
        data.component as ComponentOptionsBase<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      ).__name ||
      "DEFAULT_Dialog";
    // 设置显示
    data.props.visible = true;
    // 设置关闭回调
    data.props.onClosed = () => {
      if (!data.isCache) {
        delete componentStore[componentKey];
      } else {
        componentStore[componentKey].props.visible = false;
      }
    };
    // 已存在模态框
    if (Reflect.has(componentStore, componentKey)) {
      // 缓存的组件，直接修改props
      if (data.isCache) {
        Object.assign(componentStore[componentKey].props, {
          ...data.props,
          visible: true,
        });
      } else {
        // 不缓存组件，删除重新创建
        delete componentStore[componentKey];
        componentStore[componentKey] = { ...data, props: reactive(data.props) };
      }
    } else {
      // 新模态框
      componentStore[componentKey] = { ...data, props: reactive(data.props) };
    }
  };

  const open = <T extends Component>(
    component: T,
    props: Omit<
      ComponentProps<T>,
      "visible" | "onClosed"
    > = {} as ComponentProps<T>,
    key?: string
  ) => {
    const openParams = {
      component,
      props,
      key,
      isCache: false,
    };
    setDialog(openParams as ComponentProps<T>);
  };

  const openInCache = <T extends Component>(
    component: T,
    props: Omit<
      ComponentProps<T>,
      "visible" | "onClosed"
    > = {} as ComponentProps<T>,
    key?: string
  ) => {
    const openParams = {
      component,
      props,
      key,
      isCache: true,
    };
    setDialog(openParams as ComponentProps<T>);
  };
  const component = () => h(DynamicDialog, { componentStore });
  component.open = open;
  component.openInCache = openInCache;
  return component;
};
