import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from '../../shared/classNames';

export const Input = (props: FormFieldProps<UseFormRegisterReturn>) => {
  const { labelText, fieldRegister, error, min, max, type, ...restProps } = props;

  return (
    <div className="flex flex-col mb-4">
      <label className="text-left font-semibold mb-1 text-green-900">{labelText}</label>
      <input
        className={cn(`rounded-lg h-8 py-6 px-4 border-2 border-green-700 bg-white outline-none focus:shadow-lg focus:border-[3px]`, error && 'border-red-500')}
        type={type || 'text'}
        min={min}
        max={max}
        {...restProps}
        {...fieldRegister}
      />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
