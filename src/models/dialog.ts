export interface Dialog<T> {
  openDialog: (params?: T) => void;
}

export declare namespace DialogComponent {
  interface Props {
    visible: boolean;
    onClosed: () => void;
  }
  interface Emits {
    (event: "closed"): void;
  }
}
