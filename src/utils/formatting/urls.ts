/**
 * Appends all key-value object pairs to a url, in a URI encoded format.
 * 
 * @param url The base url
 * @param data The data to be appended to the url
 */
export function objectToURI(url: string, data: {[key: string]: string}): string {
    const keys = Object.keys(data)
    if (keys.length == 0) return url
    if (!url.endsWith("?")) url += "?"
    Object.keys(data).forEach((key, index) => {
        url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        if (index != keys.length - 1) url += "&"
    })
    return url
}