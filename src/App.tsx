import React, { FunctionComponent, Suspense } from 'react'
import * as classes from './App.module.css'
import { Loading } from './components/Loading'

const Animation = React.lazy(() => import('./components/Animation'))
export const App: FunctionComponent = () => {
  return (
    <div className={classes.app}>
      <Suspense fallback={<Loading />}>
        <Animation />
      </Suspense>
    </div>
  )
}
