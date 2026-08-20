export interface ButtonProps {
  /** Visual style. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Size. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Optional leading icon node */
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
