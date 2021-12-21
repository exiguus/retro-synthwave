import React, { Suspense } from 'react'
import * as classes from './App.module.css'
import { Loading } from './Loading'

const Canvas = React.lazy(() => import('./Canvas'))
export function App() {
  return (
    <div className={classes.App}>
      <Suspense fallback={<Loading />}>
        <Canvas />
      </Suspense>
    </div>
  )
}
