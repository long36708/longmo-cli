/**
 * @Author: longmo
 * @Date: 2025-04-06 10:32:43
 * @LastEditTime: 2025-04-06 11:12:12
 * @FilePath: packages/command/lib/index.js
 * @Description:
 */
class Command {
    constructor(program) {
        const cmd = program.command(this.command)
        cmd.description(this.description)

        if (this.options && this.options.length > 0) {
            this.options.forEach(option => {
                cmd.option(...option)
            })
        }
        cmd.action((...params) => {
            this.actions?.forEach(action => {
                action(params)
            })
        })
        
        cmd.hook('preAction', () => {
            this.preAction()
        })
        
        cmd.hook('postAction', () => {
            this.postAction()
        })
        
    }

    get command() {
        throw new Error('command must be implemented')
    }

    get description() {
        throw new Error('description must be implemented')
    }

    get options() {
        return []
    }
    
    
    get actions(){
        throw new Error('actions must be implemented')
    }
    
    preAction() {
     // empty   
    }
    
    postAction() {
     // empty   
    }
}

export default Command
