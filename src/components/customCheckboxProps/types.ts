export interface CustomCheckboxProps {
  checked: boolean;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
