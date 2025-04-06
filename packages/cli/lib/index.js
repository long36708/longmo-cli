/**
 * @Author: longmo
 * @Date: 2025-04-05 22:23:19
 * @LastEditTime: 2025-04-06 11:50:36
 * @FilePath: packages/cli/lib/index.js
 * @Description:
 */

import createInitCommand from '@longmo-cli/init'

import './exception.js'
import {createCli} from "./createCli.js";

export function entry(args) {
    console.log('entry', args)
    const program = createCli()

    createInitCommand(program)

    program.parse(args)
}
