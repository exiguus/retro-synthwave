import { FunctionComponent } from 'react'
import * as classes from './index.module.css'

export const MetaNavigation: FunctionComponent = () => {
  return (
    <div className={classes.metaNavigation}>
      <nav>
        <ul>
          <li>
            <a
              href="https://github.com/exiguus/retro-synthwave/"
              title="Github Source"
            >
              Github
            </a>
          </li>
          <li>
            <a href="https://gattner.name/" title="Front end development">
              Simon Gattner
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
