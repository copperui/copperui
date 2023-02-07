const getCollapseTriggerProps = (self) => {
  const { useIcons, breakpoint, iconToHide, iconToShow, target } = self;
  return { useIcons, breakpoint, iconToHide, iconToShow, target };
};

export { getCollapseTriggerProps as g };
