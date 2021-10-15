import axios from 'axios';

const storageKey = 'jwt';

export const ApiClient = axios.create({
    baseURL: 'https://8080-eadabfabbfefdfebbbddeeacdffcdafff.examlyiopb.examly.io'
});

export function setAuthorizationHeader(jwt) {
    console.log(jwt);
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