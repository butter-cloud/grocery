export function setAccessToken(accessToken: string) {
  setCookie('accessToken', accessToken, 3600)
}

export function setCookie(name: string, value: string, expire: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + expire * 1000) // JavaScript's setTime() method requires milliseconds
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

export function getCookie(name: string, req?: any) {
  let value = ''
  if (typeof document !== 'undefined') {
    console.log('[getCookie] Client side - name: ', name)
    console.log('[getCookie] document.cookie:', document.cookie)
    value = `; ${document.cookie}`
  } else {
    console.log('[getCookie] Server side')
    value = `; ${req.headers.cookie}`
  }
  console.log('[getCookie] value:', value)
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}
