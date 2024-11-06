require('@babel/register') // This enables us to require files that are exported as ES6.

const fs = require('fs')
const glob = require('glob')

const outputFilePath = 'src/config/routes.js'
const componentLibraryRoutes = 'src/pages/component-library/routes.js'
const files = glob.sync('src/pages/**/routes.js', {
  ignore: componentLibraryRoutes
})

files.unshift(componentLibraryRoutes)

let routes = files.reduce((result, file) => {
  const fileObject = require(`../${file}`)
  const fileRoutes = Object.values(fileObject)[0]

  result = {
    ...result,
    ...fileRoutes
  }

  return result
}, {})

// Convert object to string so we can write it to the output file.
routes = JSON.stringify(routes, null, 2)

/* eslint-disable */
fs.writeFile(
  outputFilePath,

  `// THIS FILE IS AUTOMATICALLY GENERATED!
// See: runscripts/extract-routes.js

/* eslint-disable */
export const ROUTES = ${routes}
/* eslint-enable */
`,
  function (error) {
    if (error) throw error
  }
)
/* eslint-enable */

console.log(`✅️  Done: Extracted routes to ${outputFilePath}`)