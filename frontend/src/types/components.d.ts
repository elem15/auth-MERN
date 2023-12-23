interface FormFieldProps<T>
  extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  labelText: string;
  fieldRegister?: T;
  error?: string;
  min?: string;
  max?: string;
  placeholder?: string;
}

interface FileInputProps
  extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  labelText: string;
  error?: string;
}

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  error?: string;
}
interface LinkProps
  extends React.HTMLAttributes<HTMLLinkElement> {
  children: React.ReactNode;
  to: string;
}
interface ElementProps
  extends React.HTMLAttributes<HTMLHtmlElement> {
  children: React.ReactNode;
  className?: string;
}
interface FormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}
interface RadioGroupProps<T> {
  radioList: string[];
  fieldRegister?: T;
}
