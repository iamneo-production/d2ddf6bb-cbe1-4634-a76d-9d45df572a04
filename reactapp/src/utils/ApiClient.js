import axios from 'axios';

const storageKey = 'jwt';

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    var chars = this.split('');
    chars[index] = replacement;
    var final = chars.join('');
    return final.substring(0, final.lastIndexOf('/'))
}
var url = window.location.href
url = url.replaceAt(11, '0')
export const ApiClient = axios.create({
    baseURL: url
});

export function doUrlEncodedRequest(method, params, url) {
    const data = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
    
    return {
        method,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url
    }
}

export function setAuthorizationHeader(jwt) {
    localStorage.setItem(storageKey, jwt);
    ApiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export function resetAuthorizationHeader() {
    localStorage.removeItem(storageKey);
    ApiClient.defaults.headers.common['Authorization'] = null;
}

export function loadAuthorizationHeaderFromStorage() {
    const jwt = localStorage.getItem(storageKey);
    if (jwt) {
        ApiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
}