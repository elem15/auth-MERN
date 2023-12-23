interface FormFieldProps<T>
  extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  labelText: string;
  fieldRegister?: T;
  error?: string;
  min?: string;
  max?: string;
}
interface ButtonFieldProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  error?: string;
}
interface LinkFieldProps
  extends React.HTMLAttributes<HTMLLinkElement> {
  children: React.ReactNode;
  to: string;
}
interface ElementFieldProps
  extends React.HTMLAttributes<HTMLHtmlElement> {
  children: React.ReactNode;
  className?: string;
}
interface FormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
}
