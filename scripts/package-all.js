#!/usr/bin/env node

require('shelljs/global')
const config = require('../package.json')
const appName = config.productName + '-' + config.version
const distDir = 'dist'

cd(distDir)

rm('-rf', `${appName}-darwin-osx.tar.gz`)
rm('-rf', `${appName}-linux-x64.tar.gz`)
rm('-rf', `${appName}-linux-ia32.tar.gz`)

console.log('Start compressing for Mac OS X...')
exec(`tar zcf ${appName}-darwin-x64.tar.gz ${appName}-darwin-x64`)
console.log('...DONE\n')

console.log('Start compressing for Linux x64...')
exec(`tar zcf ${appName}-linux-x64.tar.gz ${appName}-linux-x64`)
console.log('...DONE\n')

console.log('Start compressing for Linux ia32...')
exec(`tar zcf ${appName}-linux-ia32.tar.gz ${appName}-linux-ia32`)
console.log('...DONE\n')

cd('..')