export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'password';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helpText?: string;
  disabled?: boolean;
}
