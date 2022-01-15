import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import synthwave from '../../lib/synthwave'
import * as classes from './index.module.css'

export default function Canvas() {
  const refCanvas = useRef(null)
  const refH1 = useRef(null)
  const refNav = useRef(null)
  const [spacing, setSpacing] = useState(40)
  const [zOffset, setZOffset] = useState(10)

  useLayoutEffect(() => {
    if (refCanvas && refCanvas.current != null) {
      synthwave({
        element: refCanvas.current,
        spacing,
        zOffset,
      })
    }
    return () => {
      if (refCanvas && refCanvas.current != null) {
        refCanvas.current.querySelector('canvas')?.remove()
      }
    }
  }, [refCanvas, spacing, zOffset])

  useEffect(() => {
    if (refH1 && refH1.current != null && refNav && refNav.current != null) {
      refH1.current.style.width = '100%'
      refNav.current.style.height = '2.2rem'
      refNav.current.style.color = 'hsl(34deg 100% 53%)'
    }
  }, [refH1, refNav])

  return (
    <main>
      <menu>
        <h1 ref={refH1}>Synthwave Animation</h1>
        <nav ref={refNav}>
          <button onClick={() => setSpacing(prev => prev + 10)}>
            +10 Spacing
          </button>
          <button onClick={() => setSpacing(prev => prev - 10)}>
            -10 Spacing
          </button>
          <button onClick={() => setZOffset(prev => prev + 10)}>
            +10 zOffset
          </button>
          <button onClick={() => setZOffset(prev => prev - 10)}>
            -10 zOffset
          </button>
        </nav>
      </menu>
      <div ref={refCanvas} className={classes.canvas}></div>
    </main>
  )
}
