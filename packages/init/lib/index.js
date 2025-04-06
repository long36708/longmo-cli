/**
 * @Author: longmo
 * @Date: 2025-04-06 10:32:43
 * @LastEditTime: 2025-04-06 11:21:02
 * @FilePath: packages/init/lib/index.js
 * @Description:
 */

import Command from '@longmo-cli/command'

class InitCommand extends Command {
    get command() {
        return 'create <projectName>'
    }

    get description() {
        return '创建项目'
    }

    get options() {
        return [
            ['-f, --force', '是否强制创建', false]
        ]
    }

     action() {
        return ([name, opts]) => {
            console.log('name', name, opts)
        }
    }

    preAction() {
        console.log('preAction')
    }

    postAction() {
        console.log('postAction')
    }
}

function Init(program) {
    return new InitCommand(program)
}

export default Init
