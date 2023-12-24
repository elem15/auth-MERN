import { cn } from '../../shared/classNames'

export const Card = ({ children, className }: ElementProps) => {
  return (
    <div className={cn('flex flex-col mx-auto mb-5 w-72 h-80 rounded-lg py-12 px-10 border-2 border-green-700', className)}>{children}</div>
  )
}
