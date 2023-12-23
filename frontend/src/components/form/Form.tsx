export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form className='flex flex-col mx-auto mb-5 w-56 justify-center' onSubmit={onSubmit}>{children}</form>
  )
}
