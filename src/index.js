const { exit } = require('node:process')

const upload   = require('./upload.js'),
      download = require('./download.js')

const action = process.argv[2]
const values = process.argv.slice(3)

const HELP_STRING = `
ytfs

Usage:
  npm run upload <paths...>
  npm run download <urls...>
`.trim()

if (!action || !values.length) {
  console.info(HELP_STRING)
  exit()
}

(async ()=> {
  switch (action) {
  case 'upload':
    return await upload(...values)
  case 'download':
    return await download(...values)
  default:
    console.error(`Unrecognized action: ${action}`)
    return exit()
  }
})()