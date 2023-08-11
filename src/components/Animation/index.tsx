import React, {
  Suspense,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react'
import { code } from '../../lib/synthwave.json'
import { Canvas } from '../Canvas'
import synthwave from '../../lib/synthwave'
import * as classes from './index.module.css'

const Code = React.lazy(() => import('../Code'))

export default function Animation() {
  const refCanvas = useRef<HTMLDivElement>(null)
  const [spacing, setSpacing] = useState<number>(40)
  const [zOffset, setZOffset] = useState<number>(10)
  const [showCode, setShowCode] = useState<boolean>(false)

  useLayoutEffect(() => {
    const currentCanvas = refCanvas.current
    if (currentCanvas != null) {
      synthwave({
        element: currentCanvas,
        spacing,
        zOffset,
      })
    }
    return () => {
      if (currentCanvas != null) {
        currentCanvas.querySelector('canvas')?.remove()
      }
    }
  }, [refCanvas, spacing, zOffset])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCode(true)
    }, 1200)
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <main className={classes.animation}>
      <menu>
        <h1>Synthwave Animation</h1>
        <nav>
          <button onClick={() => setSpacing(prev => prev + 10)}>
            +Spacing
          </button>
          <button onClick={() => setSpacing(prev => prev - 10)}>
            -Spacing
          </button>
          <button onClick={() => setZOffset(prev => prev + 10)}>
            +zOffset
          </button>
          <button onClick={() => setZOffset(prev => prev - 10)}>
            -zOffset
          </button>
          <button
            title="show/hide code"
            onClick={() => setShowCode(prev => !prev)}
          >
            &lt;Code/&gt;
          </button>
        </nav>
      </menu>
      <Canvas ref={refCanvas} />
      {showCode && (
        <Suspense fallback={<></>}>
          <Code
            blocks={[{ id: 'synthwave', headline: 'synthwave.js', code }]}
          />
        </Suspense>
      )}
    </main>
  )
}
