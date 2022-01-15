import React, { Suspense } from 'react'
import * as classes from './App.module.css'
import { Loading } from './Loading'

const Canvas = React.lazy(() => import('./components/Canvas'))
export function App() {
  return (
    <div className={classes.app}>
      <Suspense fallback={<Loading />}>
        <Canvas />
      </Suspense>
    </div>
  )
}
