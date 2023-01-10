export interface IBrxCollapseTriggerState {
  useIcons: boolean;

  breakpoint: string | undefined;

  iconToHide: string;

  iconToShow: string;

  target: HTMLElement | string;
}
