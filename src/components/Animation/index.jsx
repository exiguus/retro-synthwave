import React, {
  Suspense,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react'
import synthwave from '../../lib/synthwave'
import { code } from '../../lib/synthwave.json'
import * as classes from './index.module.css'
import { Loading } from '../Loading'
import { Canvas } from '../Canvas'

const Code = React.lazy(() => import('../Code'))

export default function Animation() {
  const refCanvas = useRef(null)
  const [spacing, setSpacing] = useState(40)
  const [zOffset, setZOffset] = useState(10)
  const [showCode, setShowCode] = useState(false)

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
        <Suspense fallback={<Loading />}>
          <Code
            blocks={[{ id: 'synthwave', headline: 'synthwave.js', code }]}
          />
        </Suspense>
      )}
    </main>
  )
}
