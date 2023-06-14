import { useAppDispatch, useAppSelector } from './store'
import { changeTheme } from '../store/settings/SettingsActions'
import { ThemeVariants } from '../store/settings/SettingsSlice'
import { Themes } from '../constants/themes'
import { SettingsSelectors } from '../store/settings/SettingsSelectors'

export const useChangeTheme = () => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(SettingsSelectors.getTheme)

  const toggleTheme = () => {
    const newTheme: ThemeVariants = currentTheme === 'light' ? 'dark' : 'light'
    dispatch(changeTheme(newTheme))
  }

  return { theme: Themes[currentTheme], toggleTheme }
}
