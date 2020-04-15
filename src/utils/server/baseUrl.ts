const getBaseUrl = (root) => {
    const test1 = process.env.NODE_ENV === 'production' ? 'https://xxx' : 'https://xxx'
    const test2 = process.env.NODE_ENV === 'production' ? 'https://xxx' : 'https://xxx'
    const urlPool = {
        test1,
        test2
    }
    const baseUrl = /^([a-z][a-z\d+\-\\.]*:)?\/\//i.test(path) ? path : urlPool[path]
    if (baseUrl) {
        url = url.startsWith('/') ?  `${baseUrl}${url}` : `${baseUrl}/${url}`
        return url
    } else {
        throw new Error('please input a valid Url')
    }
}
export default getBaseUrl