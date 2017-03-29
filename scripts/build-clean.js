#!/usr/bin/env node

require('shelljs/global')

const currentDir = pwd()
const distDir = `${currentDir}/dist`
const tmpDir = `${currentDir}/tmp`

let tmpOnly = process.argv[2]

console.log("Started cleaning directories...")

if (tmpOnly != 'tmpOnly') {
  if(test('-e', distDir)){
    rm('-rf', `${distDir}/**/*`)
  }else{
    mkdir('-p', distDir)
  }
}

if(test('-e', tmpDir)){
  rm('-rf', `${tmpDir}/**/*`)
}else{
  mkdir('-p', tmpDir)
}

console.log(`...DONE\n`)
