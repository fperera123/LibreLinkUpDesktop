// after workaround to update electron
// this file is used to correct main entry for snapcraft build only

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import packageJson from './../../package.json' assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = path.join(__dirname, './../../package.json');

packageJson.main = './src/main/main.ts';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');