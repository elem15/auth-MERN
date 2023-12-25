import { cn } from '../../shared/classNames'

export const Form = ({ children, className, onSubmit }: FormProps) => {
  return (
    <form className={cn('flex flex-col mx-auto mb-5 w-72 justify-center', className)} onSubmit={onSubmit}>{children}</form>
  )
}
