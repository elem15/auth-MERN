export const ButtonLink = (props: ButtonFieldProps) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className='text-blue-600 hover:text-blue-500 active:text-blue-800 font-semibold'
      disabled={disabled}
      {...restProps}
    >{children}</button>
  );
}
