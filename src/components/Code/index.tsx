import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import irBlack from 'react-syntax-highlighter/dist/esm/styles/hljs/ir-black'
import * as classes from './index.module.css'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('typescript', ts)

export type Languages = 'javascript' | 'typescript'

export type Block = {
  id: string
  headline: string
  code: string
  language: Languages
}

type CodeProps = {
  blocks: Block[]
}

export default function code({ blocks }: CodeProps) {
  return (
    <article className={classes.code}>
      {blocks.map(({ id, headline, code, language }) => (
        <section className={classes.section} key={id}>
          <h2>{headline}</h2>
          <SyntaxHighlighter
            className={classes.highlighter}
            language={language}
            style={irBlack}
          >
            {code}
          </SyntaxHighlighter>
        </section>
      ))}
    </article>
  )
}
