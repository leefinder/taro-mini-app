import Taro from '@tarojs/taro'
import { LoginService } from '@/services/index'

class LoginCode {
    code: string
    openId: string
    sessionKey: string
    constructor () {
        this.code = ''
        this.openId = ''
        this.sessionKey = ''
    }
    baseLogin () {
        return new Promise((resolve, reject) => {
            Taro.checkSession().then(() => {
                const { code } = this
                if (code) {
                    resolve(code)
                } else {
                    throw new Error()
                }
            }).catch(() => {
                Taro.login().then(({ code }) => {
                    this.code = code
                    resolve(this.code)
                })
            })
        })
    }
    getOpenId () {
        return new Promise((resolve, reject) => {
            const { openId } = this
            if (openId) {
                resolve(openId)
            } else {
                this.baseLogin().then((code) => {
                    LoginService.getOpenId({code}).then(({ errorCode, data }) => {
                        if (errorCode === '0') {
                           this.openId = data
                           resolve(this.openId)
                        }
                    })
                })
            }
        })
    }
    getSessionKey () {
        return new Promise((resolve, reject) => {
            const { sessionKey } = this
            if (sessionKey) {
                resolve(sessionKey)
            } else {
                this.baseLogin().then((code) => {
                    LoginService.getSessionKey({code}).then(({ data }) => {
                        const { sessionKey } = data
                        this.sessionKey = sessionKey
                        resolve(sessionKey)
                    })
                })
            }
        })
    }
}
const loginCode = new LoginCode()
export {
    loginCode
}