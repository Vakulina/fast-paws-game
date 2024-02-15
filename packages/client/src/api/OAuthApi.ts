import axios from 'axios'
import isServer from '../utils/isServerChecker'

const redirectUrl = !isServer ? window.__REDIRECT_URL__ : null
const oauthUrlBase = 'https://oauth.yandex.ru'
const CLIENT_ID = !isServer ? window?.__CLIENT_ID__ : null

class OAuthApi {
  public getOAuthUrl() {
    return `${oauthUrlBase}/authorize/?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}/yandex-system-page`
  }
  public async getYandexUserData(token: string) {
    return axios
      .create({ baseURL: 'https://login.yandex.ru', withCredentials: false })
      .get(`/info?format=json&oauth_token=${token}`, {})
      .then(res => res.data)
  }
}
export default new OAuthApi()
