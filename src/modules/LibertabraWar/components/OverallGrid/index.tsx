import { useWarStatisticsData } from 'contexts/useDatabase'
import Scoreboard from '../Scoreboard'
import OnlineChart from '../OnlineChart'
import * as S from './styles'

const OverallGrid = (): JSX.Element => {
  const { warStatisticsData } = useWarStatisticsData()

  /* @ ToDo: skeleton */
  if (!warStatisticsData) return <div>loading...</div>
  const { score, onlineCount } = warStatisticsData
  return (
    <S.Wrapper>
      <S.PageTitle>Get live statistics for Libertabra War!</S.PageTitle>
      <S.FirstRow>
        <Scoreboard
          guildA={{
            name: 'Libertabra Pune',
            kills: score.guildA,
            diff: score.diffGuildA,
            href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Libertabra%20Pune&onlyshowonline=0',
          }}
          guildB={{
            name: 'Bones Alliance',
            kills: score.guildB,
            diff: score.diffGuildB,
            href: 'https://www.tibia.com/community/?subtopic=guilds&page=view&order=level_desc&GuildName=Bones%20Alliance&onlyshowonline=0',
          }}
        />
        <OnlineChart
          guildA={{
            name: 'Libertabra Pune',
            online: onlineCount.guildA,
          }}
          guildB={{
            name: 'Bones Alliance',
            online: onlineCount.guildB,
          }}
        />
      </S.FirstRow>
    </S.Wrapper>
  )
}

export default OverallGrid
