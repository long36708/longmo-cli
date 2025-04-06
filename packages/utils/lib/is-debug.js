/**
 * @Author: longmo
 * @Date: 2025-04-06 11:22:41
 * @LastEditTime: 2025-04-06 11:37:32
 * @FilePath: packages/utils/lib/is-debug.js
 * @Description:
 */

export function isDebug() {
    return process.argv.includes('--debug') || process.argv.includes('-d')
}
