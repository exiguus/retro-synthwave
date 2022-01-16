import { forwardRef } from 'react'
import * as classes from './index.module.css'

export const Canvas = forwardRef<HTMLDivElement>(({ children }, ref) => {
  return (
    <div className={classes.canvas} ref={ref}>
      {children}
    </div>
  )
})
