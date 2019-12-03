import {
    OPENID,
    PHONE,
    LOGINSTATE,
    TOKEN
} from '../constants/user'
import { LoginService } from '@/services/index'
import Taro from '@tarojs/taro'
const checkCode = getCode()
export const getOpenId = data => ({
    type: OPENID,
    ...data
})
export const getPhone = data => ({
    type: PHONE,
    ...data
})
export const getLoginState = data => ({
    type: LOGINSTATE,
    ...data
})
export const getDelegationTokenWeb = data => ({
    type: TOKEN,
    ...data
})
// 异步的action
export function asyncGetOpenId () {
    return dispatch => {
        checkCode().then(code => {
            LoginService.getOpenId({
                code
            }).then(({ errorCode, data }) => {
                if (errorCode === '0') {
                    dispatch(getOpenId({openId: data}))
                }
            })
        })
    }
}
function getCode () {
    let codeRefresh
    return () => {
        return Taro.checkSession().then(() => codeRefresh).catch(() => {
            return codeRefresh = Taro.login().then(({ code }) => {
                codeRefresh = code
                return codeRefresh
            })
        })
    }
}