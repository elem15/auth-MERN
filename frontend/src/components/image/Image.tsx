import { cn } from '../../shared/classNames'

export const Image = ({ src, alt, width, height, className }: ImageProps) => {
  return (
    <img src={src || '/user.png'} alt={alt} width={width} height={height} className={cn('rounded-md', className)} />
  )
}
