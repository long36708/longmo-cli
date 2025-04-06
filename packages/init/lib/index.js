/**
 * @Author: longmo
 * @Date: 2025-04-06 10:32:43
 * @LastEditTime: 2025-04-06 16:43:42
 * @FilePath: packages/init/lib/index.js
 * @Description:
 */

import Command from '@longmo-cli/command'
import {log} from '@longmo-cli/utils'
import createTemplate from "./createTemplate.js";

class InitCommand extends Command {
    get command() {
        return 'create <projectName>'
    }

    get description() {
        return '创建一个项目'
    }

    get options() {
        return [
            ['-f, --force', '是否强制创建', false],
            ['-t, --type <type>', '项目类型(值：project/page)'],
            ['-tp, --template <template>', '模板名称'],
        ]
    }

    async action([name, opts]) {
        log.verbose('init', name, opts);
        // 1.选择项目模板，生成项目信息
        const selectedTemplate = await createTemplate(name, opts);
        log.verbose('template', selectedTemplate);
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
