'use strict'

const fs = require('fs')

fs.readFile('./src/lib/synthwave.js', 'utf8', (err, data) => {
  if (err) {
    throw err
  } else {
    console.info('build: js source file read')
  }
  const code = JSON.stringify(data.toString())
  fs.writeFile('./src/lib/synthwave.json', `{ "code": ${code} }`, err => {
    if (err) {
      throw err
    } else {
      console.info('build: json source file written')
    }
  })
})
