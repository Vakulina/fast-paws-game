import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/store'
import styled from 'styled-components'
import { PlayerItem } from './PlayerItem'
import { TLeaderboardRequest } from '../../models/LeaderBoardModel'
import { getTeamLiderboard } from '../../store/leaderboard/LiaderboardActions'
import { leaderboardSelectors } from '../../store/leaderboard/LeaderboardSelectos'
import { leaderboardConstants } from '../../constants/leaderBoard'

const LeaderBoard = () => {
  const dispatch = useAppDispatch()
  const liderboardItems = useAppSelector(leaderboardSelectors.getLeaderbordItems)

  useEffect(() => {
    const leaderboardRequires: TLeaderboardRequest = {
      ratingFieldName: leaderboardConstants.ratingFieldName,
      cursor: leaderboardConstants.cursor,
      limit: leaderboardConstants.limit,
    }

    dispatch(getTeamLiderboard(leaderboardRequires))
  }, [])

  return (
    <Wrapper>
      {liderboardItems?.map((item, index) => {
        const { id, name, points, avatarUrl } = item.data
        return <PlayerItem numbering={index + 1} name={name} points={points} avatarUrl={avatarUrl} key={id} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
  width: 100%;
  justify-items: center;
  padding: 15px;

  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`
export { LeaderBoard }
