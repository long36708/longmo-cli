/**
 * @Author: longmo
 * @Date: 2025-04-06 11:15:47
 * @LastEditTime: 2025-04-06 11:38:00
 * @FilePath: packages/utils/lib/log.js
 * @Description:
 */

import log from 'npmlog'
import {isDebug} from "./is-debug.js";

if (isDebug()) {
    log.level = 'verbose'
} else {
    log.level = 'info'
}

log.heading = '[longmo-cli]'

log.addLevel('success', 2000, { fg: 'green', bold: true })

export default log
