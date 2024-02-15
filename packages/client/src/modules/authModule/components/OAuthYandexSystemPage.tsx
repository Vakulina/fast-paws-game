import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import OAuthApi from '../../../api/OAuthApi'
import AuthApi from '../../../api/AuthApi'

export const OAuthYandexSystemPage = () => {
  const location = useLocation()

  const parsedOAuthToken = function () {
    const params = new URLSearchParams(location.hash.slice(1))
    const token = params.get('access_token')
    const expiresIn = params.get('expires_in')
    return { token, expiresIn }
  }

  const sendOAuthYandexData = async () => {
    const { token } = parsedOAuthToken()

    if (token)
      try {
        const userData = await OAuthApi.getYandexUserData(token)
        const { display_name, emails, first_name, last_name, default_phone } = userData
        try {
          await AuthApi.signup({
            login: display_name,
            email: emails[0],
            first_name,
            second_name: last_name,
            phone: default_phone?.number ?? '80000000000',
            password: `${token}A`,
          })
        } catch (err) {
          if (err === 'User already in system' || err === 'Login already exists') {
            await AuthApi.signin({
              login: display_name,
              password: `${token}A`,
            })
          }
        }
        window?.opener?.postMessage({ event: 'success', error: '' })
      } catch (error) {
        window?.opener?.postMessage({
          event: 'reject',
          error,
        })
      }
  }

  useEffect(() => {
    sendOAuthYandexData()
  }, [])

  return <>Идет авторизация...</>
}
