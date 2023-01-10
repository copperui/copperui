export interface IBrxButtonInterfaceState {
  nativeClass: string | undefined;

  buttonType: string | undefined;

  disabled: boolean | undefined;

  download: string | undefined;

  href: string | undefined;

  rel: string | undefined;

  strong: boolean | undefined;

  target: string | undefined;

  type: 'submit' | 'reset' | 'button';

  block: boolean;

  circle: boolean;

  darkMode: boolean;

  active: boolean;

  loading: boolean;

  signin: boolean | 'avatar';

  color: 'danger' | 'success' | 'warning' | 'info';

  size: 'large' | 'medium' | 'small' | 'xsmall';

  variant: 'primary' | 'secondary' | 'default';
}
