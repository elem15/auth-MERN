import { UseFormRegisterReturn } from "react-hook-form";

export const Input = (props: FormFieldProps<UseFormRegisterReturn>) => {
  const { labelText, fieldRegister, error, type, ...restProps } = props;

  return (
    <div className="flex flex-col mb-4">
      <label className="text-left font-semibold mb-1 text-green-900">{labelText}</label>
      <input
        className={`rounded-lg h-8 py-6 px-4 border-2 border-green-700 bg-white outline-none focus:shadow-lg ${error ? 'border-red-500' : ''}`}
        type={type || 'text'}
        {...restProps}
        {...fieldRegister}
      />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
