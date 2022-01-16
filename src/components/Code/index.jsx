import * as classes from './index.module.css'

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import irBlack from 'react-syntax-highlighter/dist/esm/styles/hljs/ir-black'

SyntaxHighlighter.registerLanguage('javascript', js)

export default function code({ blocks }) {
  return (
    <article className={classes.code}>
      {blocks.map(({ id, headline, code }) => (
        <section className={classes.section} key={id}>
          <h2>{headline}</h2>
          <SyntaxHighlighter
            className={classes.highlighter}
            language="javascript"
            style={irBlack}
          >
            {code}
          </SyntaxHighlighter>
        </section>
      ))}
    </article>
  )
}
