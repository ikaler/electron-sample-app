#!/usr/bin/env node

require('shelljs/global')
const config = require('../package.json')

const currentDir = pwd()
const electronVersion = config.electronVersion
const appVersion = config.version
const appName = config.productName + '-' + appVersion
const distDir = `${currentDir}/dist`
const tmpDir = `${currentDir}/tmp`
const srcDir = `${currentDir}/src`
const iconPath = `${tmpDir}/assets/images/app-icon`

let platform = process.argv[2]
let arch = process.argv[3]

//console.log(appVersion)
//console.log(platform)
//console.log(arch);

if (platform != 'darwin' && platform != 'win32' && platform != 'linux') {
    platform = ''
}

if ((arch != 'ia32' && arch != 'x64') || platform == 'darwin') {
    arch = 'x64'
}

if (!platform || !arch) {
  console.log("Usage: npm run build <platform> <arch>")
  console.log(" platform:   darwin, linux, win32")
  console.log(" arch:       x64 (default), ia32")
  return;
}

if(test('-e', distDir)){
  //console.log(`'${distDir}' directory exist.`)
}else{
  mkdir('-p', distDir)
  console.log(`'${distDir}' directory created.`)
}
if(test('-e', tmpDir)){
  rm('-rf', `${tmpDir}/**/*`)
  //console.log(`'${tmpDir}' directory cleared.`)
}else{
  mkdir('-p', tmpDir)
  console.log(`'${tmpDir}' directory created.`)
}

// copy files to tmp directory
cp('-rf', `${srcDir}/*`, tmpDir)

console.log(`Building package for ${platform}...`)
exec(`electron-packager ${tmpDir} ${appName} --electron-version=${electronVersion} --app-version=${appVersion} --icon=${iconPath} --platform=${platform} --arch=${arch} --out=${distDir} --prune=true --asar --overwrite`);
console.log(`...DONE\n`)


