import React, {
  Suspense,
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { Canvas } from '../Canvas'
import synthwave from '../../lib/synthwave'
import SynthwaveModule from '../../lib/Synthwave.module'
import * as classes from './index.module.css'
import { CodeBlock, SourceTypes } from './types'
import { code } from './defaults'

const Code = React.lazy(() => import('../Code'))

export default function Animation() {
  const refCanvas = useRef<HTMLDivElement>(null)
  const [spacing, setSpacing] = useState<number>(40)
  const [zOffset, setZOffset] = useState<number>(10)
  const [showCode, setShowCode] = useState<boolean>(false)
  const [source, setSource] = useState<SourceTypes>('js')
  const [codeBlock, setCodeBlock] = useState<CodeBlock>(code.js)

  const handleDownload = useCallback(() => {
    const currentCanvas = refCanvas.current
    if (currentCanvas != null) {
      const canvas = currentCanvas.querySelector('canvas')
      if (canvas != null) {
        const link = document.createElement('a')
        const timestamp = new Date().toISOString()
        link.download = `synthwave-${timestamp}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
    }
  }, [refCanvas])

  useLayoutEffect(() => {
    const currentCanvas = refCanvas.current
    if (currentCanvas != null) {
      currentCanvas.querySelector('canvas')?.remove()
      const options = {
        element: currentCanvas,
        spacing,
        zOffset,
      }
      if (source === 'js') {
        synthwave(options)
        setCodeBlock(code.js)
      }
      if (source === 'ts') {
        SynthwaveModule(options)
        setCodeBlock(code.ts)
      }
    }
    return () => {
      if (currentCanvas != null) {
        currentCanvas.querySelector('canvas')?.remove()
      }
    }
  }, [refCanvas, source, spacing, zOffset])

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
          <button
            title="toggle source from js to ts"
            onClick={() => setSource(prev => (prev === 'js' ? 'ts' : 'js'))}
          >
            &lt;Source/&gt;
          </button>
          <button title="download canvas" onClick={handleDownload}>
            &lt;Save /&gt;
          </button>
        </nav>
      </menu>
      <Canvas ref={refCanvas} />
      {showCode && (
        <Suspense fallback={<></>}>
          <Code blocks={[codeBlock]} />
        </Suspense>
      )}
    </main>
  )
}
