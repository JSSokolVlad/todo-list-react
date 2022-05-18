export interface CustomTextFieldProps {
  className?: string;
  error?: boolean;
  helperText?: string;
  label?: string;
  multiline?: boolean;
  name: string;
  rows?: number;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}
