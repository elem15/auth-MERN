import { cn } from '../../shared/classNames'

export const Card = ({ children, className }: ElementProps) => {
  return (
    <div className={cn('flex flex-col content-center mx-auto m-5 w-72 rounded-lg py-4 px-3 border-2 border-green-700  hover:drop-shadow-lg group', className)}>{children}</div>
  )
}
