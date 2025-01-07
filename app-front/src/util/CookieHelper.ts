import Cookies from "js-cookie";

export function setAccessToken(accessToken: string) {
    Cookies.set('accessToken', accessToken, {
        secure: true,
        sameSite: 'strict',
        path: '/',
    })
}

export function setCookie(name: string, value: string, expire: number) {
    const expires = new Date()
    expires.setTime(expires.getTime() + expire)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}