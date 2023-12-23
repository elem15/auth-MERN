import { cn } from '../../shared/classNames';

export const Button = ({ children, disabled, error, ...restProps }: ButtonFieldProps) => {

  return (
    <button
      className={cn('rounded-lg w-fit my-3 px-4 py-2 border-green-500 bg-green-700 text-white text-xl outline-none hover:shadow-lg hover:bg-green-600 active:bg-green-800 focus:bg-green-600 focus:outline-green-700',
        error && 'border-red-500',
        disabled && 'bg-green-100 border-2 border-green-200 text-green-300 hover:shadow-none hover:bg-green-100 active:bg-green-100'
      )}
      disabled={disabled}
      {...restProps}
    >{children}</button>
  );
}
