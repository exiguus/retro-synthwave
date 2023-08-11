import React, { Suspense } from 'react'
import * as classes from './App.module.css'
import { Loading } from './components/Loading'
import { MetaNavigation } from './components/MetaNavigation'

const Animation = React.lazy(() => import('./components/Animation'))
export const App = () => {
  return (
    <div className={classes.app}>
      <Suspense fallback={<Loading />}>
        <Animation />
      </Suspense>
      <MetaNavigation />
    </div>
  )
}
