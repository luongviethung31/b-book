import { getAccessToken, getRefreshToken } from "hooks/localAuth"

const getHeaderWithToken = () => {
    const token = getAccessToken()
    return {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    }
}

const refreshTokenValue = () =>{
    const refreshToken = getRefreshToken()
    return { refreshToken : refreshToken}
}

export {
    getHeaderWithToken,
    refreshTokenValue
}