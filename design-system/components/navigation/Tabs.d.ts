export interface TabItem { label: string; value: string; }
export interface TabsProps {
  items: TabItem[];
  active: string;
  onChange?: (value: string) => void;
}
