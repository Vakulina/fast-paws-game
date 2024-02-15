import { useEffect, useRef, useState } from 'react'
import OAuthApi from '../api/OAuthApi'

interface MessageData {
  event: 'success' | 'reject'
  error?: string
}

export function useYandexOAuth() {
  const popup = useRef<Window | null>()
  const closeCheckTimer = useRef<number | null>(null)
  const [authenticated, setAuthenticated] = useState(false)

  async function init() {
    try {
      const link = await OAuthApi.getOAuthUrl()
      if (link) window?.addEventListener('message', onMessageReceived)
      popup.current = window?.open(link, 'Авторизация по Яндекс.ID', 'left=100,top=100,width=600,height=600')
      closeCheckTimer.current = window?.setInterval(() => {
        if (popup.current?.closed) {
          clear()
          console.log('Не удалось авторизоваться по Яндекс.ID.')
        }
      }, 300)
      popup.current?.focus()
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const onMessageReceived = (e: MessageEvent<MessageData>) => {
    if (e.origin !== location?.origin) return
    if (e.origin === location?.origin) {
      if (e.data.event === 'success') {
        setAuthenticated(true)
        clear()
      }
      if (e.data.event === 'reject') {
        console.log(e.data.error)
        clear()
      }
    }
  }

  function clear() {
    window?.removeEventListener('message', onMessageReceived)
    if (closeCheckTimer.current) {
      clearInterval(closeCheckTimer.current)
    }
    popup.current?.close()
    popup.current = undefined
  }

  function reset() {
    setAuthenticated(false)
  }

  useEffect(() => {
    return () => clear()
  }, [])

  return { authenticated, init, reset, clear, popup }
}
