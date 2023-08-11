import * as classes from './index.module.css'

export const MetaNavigation = () => {
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
            <a
              href="https://www.gattner.name/"
              title="Full-Stack and Frontend development"
            >
              Simon Gattner
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
