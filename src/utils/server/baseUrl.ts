const getBaseUrl = (root) => {
    const apptec = process.env.NODE_ENV === 'production' ? 'https://xxx' : 'https://xxx'
    const leapUrl = process.env.NODE_ENV === 'production' ? 'https://xxx' : 'https://xxx'
    const urlPool = {
        apptec,
        leapUrl
    }
    if (urlPool[root]) {
        return urlPool[root]
    } else {
        throw new Error('please input a valid Url')
    }
}
export default getBaseUrl