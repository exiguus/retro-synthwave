import { code as codeJs } from '../../lib/synthwave.js.json'
import { code as codeTs } from '../../lib/Synthwave.module.ts.json'

import type { SourceTypes, CodeBlock } from './types'

export const code: Record<SourceTypes, CodeBlock> = {
  js: {
    id: 'synthwave-js',
    headline: 'synthwave.js',
    code: codeJs,
  },
  ts: {
    id: 'synthwave-ts',
    headline: 'Synthwave.module.ts',
    code: codeTs,
  },
}
