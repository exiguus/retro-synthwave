import { forwardRef } from 'react'
import * as classes from './index.module.css'

export const Canvas = forwardRef((_props, ref) => {
  return <div className={classes.canvas} ref={ref}></div>
})
