import { OPENID, PHONE, LOGINSTATE, TOKEN } from '../constants/user'


const USER_STATE = {
    openId: -1,
    phone: '',
    loginState: '',
    delegationTokenWeb: '',
}

export default function user(state = USER_STATE, action) {
    switch (action.type) {
        case OPENID:
            return {
                ...state,
                openId: action.openId
            }
        case PHONE:
            return {
                ...state,
                phone: action.phone
            }
        case LOGINSTATE:
            return {
                ...state,
                loginState: action.loginState
            }
        case TOKEN:
            return {
                ...state,
                delegationTokenWeb: action.delegationTokenWeb
            }
        default:
            return state
    }
}
