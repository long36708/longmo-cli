#!/usr/bin/env node
import importLocal from 'import-local'
import {log} from '@longmo-cli/utils'
import {entry} from '../lib/index.js'
import {filename} from 'dirname-filename-esm';

const __filename = filename(import.meta);

if (importLocal(__filename)) {
    log.info('cli', 'using local version of cli')
} else {
    entry(process.argv.slice(2))
}
