/**
 * @Author: longmo
 * @Date: 2025-04-06 15:17:06
 * @LastEditTime: 2025-04-06 15:18:59
 * @FilePath: packages/cli/__test__/cli.test.js
 * @Description:
 */
import path from 'node:path';
import { execa } from 'execa';
import {dirname} from "dirname-filename-esm";
const __dirname = dirname(import.meta);
const CLI = path.join( __dirname,'../bin/cli.js');
const bin = () => (...args) => execa(CLI, args);

// 测试运行错误的命令
test('run error command', async () => {
    const { stderr } = await bin()('iii');
    expect(stderr).toContain('未知的命令：iii');
});
