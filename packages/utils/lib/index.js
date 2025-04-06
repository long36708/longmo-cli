/**
 * @Author: longmo
 * @Date: 2025-04-06 11:15:53
 * @LastEditTime: 2025-04-06 16:18:54
 * @FilePath: packages/utils/lib/index.js
 * @Description:
 */

import log from './log.js'
import {isDebug} from './is-debug.js'
import {makeInput, makeList, makePassword} from './inquirer.js';
import {clearCache, getGitPlatform} from './git/GitServer.js';
import {createRemoteRepo, initGitServer, initGitType} from './git/GitUtils.js';
import Github from './git/Github.js';
import Gitee from './git/Gitee.js'
import { getLatestVersion } from './npm.js';
import request from './request.js';
export function printErrorLog(e, type) {
    if (isDebug()) {
        log.error(type, e);
    } else {
        log.error(type, e.message);
    }
}

export {
    log,
    isDebug,
    makeList,
    makeInput,
    makePassword,
    getLatestVersion,
    request,
    Github,
    Gitee,
    getGitPlatform,
    initGitServer,
    initGitType,
    clearCache,
    createRemoteRepo,
}
