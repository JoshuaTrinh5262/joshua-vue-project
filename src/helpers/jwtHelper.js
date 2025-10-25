export function jwtDecode(token) {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null

    // Replace URL-safe chars
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    // Decode Base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    return JSON.parse(jsonPayload)
  } catch (err) {
    return null
  }
}