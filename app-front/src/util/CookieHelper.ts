
export function setAccessToken(accessToken: string) {
    setCookie('accessToken', accessToken, 3600)
}

export function setCookie(name: string, value: string, expire: number) {
    const expires = new Date()
    expires.setTime(expires.getTime() + expire)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}