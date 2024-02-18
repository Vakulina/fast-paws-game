import FetchApi from '../utils/fetchApi'
import { TSignIn } from '../models/SignInModel'
import { TSignUpFormValues } from '../models/RegistrationModel'

class AuthApi {
  public signin(body: TSignIn) {
    return FetchApi.post('/auth/signin', { body })
  }

  public logout() {
    return FetchApi.post<string>('/auth/logout')
  }

  public signup(body: TSignUpFormValues) {
    return FetchApi.post<{ id: number }>('/auth/signup', { body })
  }
  public setOAuthToken(token: string) {
    return FetchApi.post('/auth/oauth', {
      body: {
        token,
      },
    })
  }
}

export default new AuthApi()
