import { forwardRef } from 'react'
import * as classes from './index.module.css'

export type CanvasProps = {
  children?: React.ReactNode
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(function Canvas(
  { children },
  ref
) {
  return (
    <div className={classes.canvas} ref={ref}>
      {children}
    </div>
  )
})
