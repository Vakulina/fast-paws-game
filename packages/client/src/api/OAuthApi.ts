import FetchApi from '../utils/fetchApi'
import isServer from '../utils/isServerChecker'

const REDIRECT_URL = !isServer ? window.__REDIRECT_URL__ : null
const redirectUrl = REDIRECT_URL || 'http://localhost:5000'
const oauthUrlBase = 'https://oauth.yandex.ru/authorize'

class OAuthApi {
  public getServiceId() {
    return FetchApi.get<{ service_id: string }>(`/oauth/yandex/service-id/?redirect_uri=${redirectUrl}`)
  }

  public getOAuthUrl(serviceId: string) {
    return `${oauthUrlBase}/?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`
  }

  public signin(code: string) {
    return FetchApi.post<string>('/oauth/yandex/', {
      body: {
        code,
        redirect_uri: redirectUrl,
      },
    })
  }
}

export default new OAuthApi()
