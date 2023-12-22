interface FormFieldProps<T>
  extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  labelText: string;
  fieldRegister: T;
  error?: string;
}
interface ButtonFieldProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  error?: string;
}
