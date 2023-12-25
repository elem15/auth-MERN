import { cn } from '../../shared/classNames'

export const H1 = ({ children, className }: ElementProps) => {
  return (
    <h1 className={cn('mb-5 text-center text-xl font-semibold text-green-950', className)}>{children}</h1>
  )
}
