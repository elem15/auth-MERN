export const Button = (props: ButtonFieldProps) => {
  const { children, disabled, error, ...restProps } = props;

  return (
    <button
      className={`
        rounded-lg w-fit my-3 px-4 py-2 border-green-500 bg-green-700 text-white text-xl outline-none hover:shadow-lgactive:bg-green-900
        ${error ? 'border-red-500' : ''}
        ${disabled ? 'bg-green-100 border-2 border-green-200 text-green-300 hover:shadow-none active:bg-green-100' : ''}
      `}
      disabled={disabled}
      {...restProps}
    >{children}</button>
  );
}
