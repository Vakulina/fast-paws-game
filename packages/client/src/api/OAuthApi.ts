import FetchApi from '../utils/fetchApi'

const redirectUrl = 'http://localhost:3001'
const oauthUrlBase = 'https://oauth.yandex.ru/authorize'

class OAuthApi {
  public getServiceId() {
    return FetchApi.get(`/oauth/yandex/service-id/?redirect_uri=${redirectUrl}`)
  }

  public getOAuthUrl(serviceId: string) {
    return `${oauthUrlBase}/?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`
  }

  public signin(code: string) {
    return FetchApi.post('/oauth/yandex/', {
      body: JSON.stringify({
        code,
        redirect_uri: redirectUrl,
      }),
    })
  }
}

export default new OAuthApi()
