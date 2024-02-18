import ProfilePage from '../pages/ProfilePage'
import ForumPage from '../pages/ForumPage'
import TopicPage from '../pages/TopicPage'
import CommentPage from '../pages/CommentsPage'
import LeaderBoardPage from '../pages/LeaderBoardPage'
import RegistrationPage from '../pages/RegistrationPage'
import AuthPage from '../pages/AuthPage'
import NotFoundPage from '../pages/NotFoundPage'
import MainPage from '../pages/MainPage'
import { AppDispatch } from '../hooks/store'
import { getUser } from '../store/auth/AuthActions'
import { Routes } from '../constants/routes'
import GameLoaderPage from '../pages/GameLoaderPage'
import { OAuthYandexSystemPage } from '../modules/authModule/components/OAuthYandexSystemPage'

export const routes = [
  {
    path: Routes.SIGNIN,
    requireUnAuth: true,
    exact: true,
    element: <AuthPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: Routes.OAUTH_PAGE,
    requireUnAuth: true,
    exact: true,
    element: <OAuthYandexSystemPage />,
  },
  {
    path: Routes.SIGNUP,
    exact: true,
    requireUnAuth: true,
    element: <RegistrationPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: Routes.HOME,
    exact: true,
    element: <MainPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: Routes.SETTINGS,
    exact: true,
    requireAuth: true,
    element: <ProfilePage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: Routes.FORUM,
    exact: true,
    requireAuth: true,
    element: <ForumPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: `${Routes.FORUM}/:forumId`,
    requireAuth: true,
    element: <TopicPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: `${Routes.FORUM}/${Routes.TOPIC}/:topicId`,
    requireAuth: true,
    element: <CommentPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: Routes.GAME,
    exact: true,
    element: <GameLoaderPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: Routes.LEADERBOARD,
    exact: true,
    requireAuth: true,
    element: <LeaderBoardPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFoundPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
]
