import { HTTP_URL } from './config'

const isProd = process.env.NODE_ENV === 'production'
const getBaseUrl = (path, url) => {
    const test1 = isProd ? HTTP_URL.APPTEC : HTTP_URL.APPTECTEST;
    const test2 = isProd ? HTTP_URL.LEAP : HTTP_URL.LEAPTEST;
    const test3 = isProd ? HTTP_URL.LEAPMALL : HTTP_URL.LEAPMALLTEST;
    const urlPool = {
        test1,
        test2,
        test3
    };
    const baseUrl = /^([a-z][a-z\d+\-\\.]*:)?\/\//i.test(path) ? path : urlPool[path];
    if (baseUrl) {
        url = url.startsWith('/') ?  `${baseUrl}${url}` : `${baseUrl}/${url}`;
        return url;
    } else {
        throw new Error('please input a valid Url');
    }
};
export default getBaseUrl;