import {dirname} from "dirname-filename-esm";
import fse from "fs-extra";
import {program} from 'commander'
/**
 * @Author: longmo
 * @Date: 2025-04-06 11:44:59
 * @LastEditTime: 2025-04-06 11:51:38
 * @FilePath: packages/cli/lib/createCli.js
 * @Description:
 */
import {log} from '@longmo-cli/utils'
import path from 'node:path'

const dirname1 = dirname;
const __dirname = dirname1(import.meta);
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = fse.readJsonSync(pkgPath);
const LOWEST_NODE_VERSION = 21

function checkNodeVersion() {
    log.verbose('node version', process.version)

    if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
        log.error(`longmo-cli 需要安装 v${LOWEST_NODE_VERSION} 或以上版本的 Node.js`)
        throw new Error(chalk.red`longmo-cli 需要安装 v${LOWEST_NODE_VERSION} 或以上版本的 Node.js`)
    }
}

function preAction() {
    log.verbose('preAction')
    // 检查node版本
    checkNodeVersion()
}

export function createCli() {
    log.info('version', pkg.version);
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d, --debug', '是否开启调试模式', false)
        .hook('preAction', preAction);

    program.on('option:debug', function () {
        console.log(program.opts());
        if (program.opts().debug) {
            log.verbose('debug', 'launch debug mode');
        }
    });

    program.on('command:*', function (obj) {
        log.error('未知的命令：' + obj[0]);
    });
    return program;
}
