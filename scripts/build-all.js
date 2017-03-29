#!/usr/bin/env node

require('shelljs/global')

exec(`npm run build darwin x64`)
exec(`npm run build linux x64`)
exec(`npm run build linux ia32`)

// need 'wine' installation on mac or run on Windows machine
//exec(`npm run build win32 x64`)
//exec(`npm run build win32 ia32`) 

