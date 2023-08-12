const fs = require('fs')

const sources = ['./src/lib/synthwave.js', './src/lib/Synthwave.module.ts']

sources.forEach(source => {
  fs.readFile(source, 'utf8', (err, data) => {
    if (err) {
      throw err
    } else {
      console.info(`create:source file read: ${source}`)
    }
    const code = JSON.stringify(data.toString())
    fs.writeFile(`${source}.json`, `{ "code": ${code} }`, err => {
      if (err) {
        throw err
      } else {
        console.info(`create:source file written: ${source}.json`)
      }
    })
  })
})
