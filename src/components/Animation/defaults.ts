import { code as codeJs } from '../../lib/synthwave.js.json'
import { code as codeTs } from '../../lib/Synthwave.module.ts.json'

import type { Block, Languages } from '../Code'

export const code: Record<Languages, Block> = {
  javascript: {
    id: 'synthwave-js',
    headline: 'synthwave.js',
    code: codeJs,
    language: 'javascript',
  },
  typescript: {
    id: 'synthwave-ts',
    headline: 'Synthwave.module.ts',
    code: codeTs,
    language: 'typescript',
  },
}
