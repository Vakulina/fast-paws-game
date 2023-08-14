import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProfileForm from '../../components/ProfileForm'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { logOut, updateUser } from '../../store/auth/AuthActions'
import Button from '../../ui/button'
import styled from 'styled-components'
import { TProfile } from '../../models/ProfileModel'
import { ProfileFormPopup } from '../../components/ProfileFormPopup'
import ProfileAvatar from '../../components/ProfileAvatar'
import { authSelectors } from '../../store/auth/AuthSelectors'
import { useChangeTheme } from '../../hooks/useChangeTheme'

const SUCCESS_MESSAGE = 'Данные успешно обновлены!'

const Profile = () => {
  const { toggleTheme } = useChangeTheme()
  const dispatch = useAppDispatch()

  const [userValues, setDefaultValues] = useState<TProfile | null>(null)
  const [isUpdateUser, setIsUpdateUser] = useState<boolean>(false)
  const [modalSuccess, setModalSuccess] = useState(false)

  const user = useAppSelector(authSelectors.getUser)
  const userStatus = useAppSelector(authSelectors.getUserStatus)
  const serverError = useAppSelector(authSelectors.getUserError)
  const themeBtnRef = useRef<HTMLButtonElement | null>(null)
  const hasUserData = !!user?.email

  useEffect(() => {
    if (hasUserData)
      setDefaultValues({
        ...user,
        fileAvatar: null,
        display_name: user.display_name ?? `${user.first_name} ${user.second_name}`,
      })
  }, [])

  useEffect(() => {
    if (hasUserData)
      setDefaultValues({
        ...user,
        fileAvatar: null,
        display_name: user.display_name ?? `${user.first_name} ${user.second_name}`,
      })
  }, [user])

  useEffect(() => {
    if (userStatus === 'success' && isUpdateUser && !serverError) {
      setModalSuccess(true)
      setIsUpdateUser(false)
    }
  }, [userStatus])

  const handleToggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme()
    themeBtnRef?.current?.blur()
  }

  const closeModalSuccess = useCallback(() => {
    setModalSuccess(false)
  }, [setModalSuccess])

  const handleSubmitUser = async (data: TProfile) => {
    console.log(data)

    dispatch(updateUser(data))
    setIsUpdateUser(true)
  }

  const handleLogOut = useCallback(() => {
    dispatch(logOut())
  }, [dispatch])

  if (userValues) {
    const { avatar, fileAvatar, ...values } = userValues
    return (
      <>
        <ProfileAvatar />
        <ProfileForm onSubmitUser={handleSubmitUser} defaultFormValues={values} />
        <Footer>
          <Button onClick={handleToggleTheme} ref={themeBtnRef}>
            Toggle theme
          </Button>
          <Button onClick={handleLogOut}>Log out</Button>
        </Footer>
        <ProfileFormPopup
          title={'Profile'}
          visible={modalSuccess}
          outSideClickEnable
          handleClose={closeModalSuccess}
          successMessageProp={SUCCESS_MESSAGE}
        />
      </>
    )
  } else {
    return <></>
  }
}

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`
export default Profile
