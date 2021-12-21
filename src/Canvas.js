import React, { useEffect } from 'react'
import synthwave from './synthwave'
import * as classes from './Canvas.module.css'

export default function Canvas() {
  useEffect(() => {
    synthwave({
      spacing: 20,
      zOffset: 20,
    })
  }, [])
  return <div className={classes.canvas} id="synthwave"></div>
}
