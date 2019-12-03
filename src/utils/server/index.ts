import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class BaseRequest {

    baseOptions(params) {
        let { path, url, data, contentType, method } = params
        const baseUrl = getBaseUrl(path)
        url = url.startsWith('/') ? baseUrl + url :  baseUrl + '/' + url
        contentType = contentType || 'application/x-www-form-urlencoded'
        method = method || 'GET'
        const option = {
            url,
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
function httpRequest () {
    let ajax
    if (ajax) {
        return ajax
    } else {
        return ajax = new BaseRequest()
    }
}

export default httpRequest