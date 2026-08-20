export interface ToastProps {
  tone?: 'info' | 'positive' | 'negative';
  children: React.ReactNode;
  onClose?: () => void;
}
