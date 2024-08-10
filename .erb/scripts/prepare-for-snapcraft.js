// after workaround to update electron
// this file is used to correct main entry for snapcraft build only
const fs = require('fs');
const path = require('path');
const packageJson = require('./../../package.json');

const packageJsonPath = path.join(__dirname, './../../package.json');

packageJson.main = './src/main/main.ts';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
