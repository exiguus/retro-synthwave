import ReactDOM from 'react-dom'
import { App } from './App'

import synthwave from './synthwave'

const app = document.getElementById('app')
ReactDOM.render(<App />, app)

synthwave()
