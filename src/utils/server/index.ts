import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))
type Option = {
    url: string,
    data?: object | string,
    method: any,
    header: object
}
class BaseRequest {

    baseOptions(params) {
        let { path, url, data, contentType, method } = params
        const baseUrl = getBaseUrl(path, url)
        contentType = contentType || 'application/x-www-form-urlencoded'
        method = method || 'GET'
        const option: Option = {
            url: baseUrl,
            data,
            method,
            header: {
                'content-type': contentType,
                'Authorization': Taro.getStorageSync('Authorization')
            }
        }
        return Taro.request(option)
    }

    get({ url, data = {}, path = 'apptec' }) {
        const option = {
            path,
            url,
            data,
            method: 'GET'
        }
        return this.baseOptions(option)
    }

    post({ url, data, contentType, path = 'apptec' }) {
        const option = {
            url,
            data,
            contentType,
            path,
            method: 'POST'
        }
        return this.baseOptions(option)
    }

    put({ url, data = {}, path = 'apptec' }) {
        const option = {
            url,
            data,
            path,
            method: 'PUT'
        }
        return this.baseOptions(option)
    }

    delete({ url, data = {}, path = 'apptec' }) {
        const option = {
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