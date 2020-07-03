import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))
type Header = {
    'content-type': string,
    'Authorization': string
}

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS'

type Option = {
    url: string,
    data: object | string,
    method: Method,
    header: Header,
    path: string
}
class BaseRequest {

    baseOptions(params) {
        let { path, url, data, header, method } = params
        const baseUrl = getBaseUrl(path, url)
        let defaultHeader: Header = Object.assign({
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': Taro.getStorageSync('Authorization')
        }, header)
        method = method || 'GET'
        const option: Omit<Option, 'path'> = {
            url: baseUrl,
            data,
            method,
            header: defaultHeader
        }
        return Taro.request(option)
    }

    get({ url, data = {}, path = 'apptec' }) {
        const option: Partial<Option> = {
            path,
            url,
            data,
            method: 'GET'
        }
        return this.baseOptions(option)
    }

    post({ url, data, header, path = 'apptec' }) {
        const option: Partial<Option> = {
            url,
            data,
            header,
            path,
            method: 'POST'
        }
        return this.baseOptions(option)
    }

    put({ url, data = {}, path = 'apptec' }) {
        const option: Partial<Option> = {
            url,
            data,
            path,
            method: 'PUT'
        }
        return this.baseOptions(option)
    }

    delete({ url, data = {}, path = 'apptec' }) {
        const option: Partial<Option> = {
            url,
            data,
            path,
            method: 'DELETE'
        }
        return this.baseOptions(option)
    }

}
function init () {
    let ajax
    return () => {
        if (!ajax) {
            ajax = new BaseRequest()
        }
        return ajax
    }
}
const httpRequest = init()
export default httpRequest