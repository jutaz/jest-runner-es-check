const fs = require('fs')
const path = require('path')
const acorn = require('acorn')
const { pass, fail } = require('create-jest-runner')
/**
 * This runner is heavily inspired by {@link https://github.com/dollarshaveclub/es-check}
 * It's using parts of the code directly from that repository, as there's no easy to way
 * to just extract the core. The aim is to be 100% compatible with the original implementation too.
 *
 * If the core is extracted, this code will be updated to only use that.
 */

const configFilePath = path.resolve(process.cwd(), '.escheckrc')

let configFile = {}

if (fs.existsSync(configFilePath)) {
  configFile = JSON.parse(fs.readFileSync(configFilePath))
}

const getEcmaVersion = (version) => {
  switch (version) {
    case 'es3':
      return '3'
    case 'es4':
      return '4'
    case 'es5':
      return '5'
    case 'es6':
    case 'es2015':
      return '6'
    case 'es7':
    case 'es2016':
      return '7'
    case 'es8':
    case 'es2017':
      return '8'
    case 'es9':
    case 'es2018':
      return '9'
    case 'es10':
    case 'es2019':
      return '10'
    default:
      throw new Error(`Invalid ECMA version specified: ${version}`)
  }
}

module.exports = ({ testPath, config }) => {
  const start = Date.now()
  const options = config.testEnvironmentOptions || {}
  const contents = fs.readFileSync(testPath, 'utf8')

  const ecmaVersion = getEcmaVersion(options.ecmaVersion || configFile.ecmaVersion)
  const esmodule = options.module || configFile.module
  const allowHashBang = options.allowHashBang || configFile.allowHashBang

  const acornOpts = { ecmaVersion, silent: true }

  if (esmodule) {
    acornOpts.sourceType = 'module'
  }

  if (allowHashBang) {
    acornOpts.allowHashBang = true
  }

  try {
    acorn.parse(contents, acornOpts)
    const end = Date.now()
    return pass({ start, end, test: { path: testPath } })
  } catch (err) {
    const end = Date.now()
    return fail({
      start,
      end,
      test: {
        location: {
          line: err.loc.line,
          column: err.raisedAt
        },
        path: testPath,
        errorMessage: err,
        title: 'ES check'
      }
    })
  }
}
