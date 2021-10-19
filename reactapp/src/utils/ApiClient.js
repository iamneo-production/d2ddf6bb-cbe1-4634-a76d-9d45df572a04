import axios from 'axios';

const storageKey = 'jwt';

export const ApiClient = axios.create({
    baseURL: 'https://' + window.location.hostname.replace('8081', '8080')
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