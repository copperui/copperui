export interface IBrxCollapseTriggerState {
  target: HTMLElement | string;

  useIcons: boolean;

  iconToHide: string;

  iconToShow: string;

  breakpoint: string | undefined;
}

export const getCollapseTriggerProps = <Self extends IBrxCollapseTriggerState>(self: Self): IBrxCollapseTriggerState => {
  const { useIcons, breakpoint, iconToHide, iconToShow, target } = self;
  return { useIcons, breakpoint, iconToHide, iconToShow, target };
};
