import { cn } from '../../shared/classNames'

export const Image = ({ src, alt, className }: ImageProps) => {
  return (
    <img src={src || '/user.png'} alt={alt} className={cn('w-64 rounded-md', className)} />
  )
}
