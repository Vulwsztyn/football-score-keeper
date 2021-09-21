import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayerCreator from './PlayerCreator'
import TeamCreator from './TeamCreator'
import GameCreator from './GameCreator'
import myAxios from '../../utils/myAxios'

export default function Creators({
  fetchData,
}: {
  fetchData: () => Promise<any>
}) {
  const [players, setPlayers] = React.useState([])
  const [teams, setTeams] = React.useState([])
  const [playerCreatorExpanded, setPlayerCreatorExpanded] =
    React.useState(false)
  const [teamCreatorExpanded, setTeamCreatorExpanded] = React.useState(false)
  const [gameCreatorExpanded, setGameCreatorExpanded] = React.useState(false)

  const fetchPlayers = async () => {
    const res = await myAxios.get('/players')
    if (res.status == 200) {
      setPlayers(res.data)
    }
  }
  const fetchTeams = async () => {
    const res = await myAxios.get('/teams')
    if (res.status == 200) {
      setTeams(res.data)
    }
  }
  React.useEffect(() => {
    fetchPlayers()
    fetchTeams()
  }, [])
  return (
    <div>
      <Accordion expanded={playerCreatorExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="player-header"
          onClick={() => setPlayerCreatorExpanded(!playerCreatorExpanded)}
        >
          <Typography>Create player</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlayerCreator
            fetchData={async () => {
              fetchPlayers()
              fetchData()
            }}
            setPlayerCreatorExpanded={setPlayerCreatorExpanded}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={teamCreatorExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="team-header"
          onClick={() => setTeamCreatorExpanded(!teamCreatorExpanded)}
        >
          <Typography>Create team</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TeamCreator
            fetchData={async () => {
              fetchTeams()
              fetchData()
            }}
            players={players}
            setTeamCreatorExpanded={setTeamCreatorExpanded}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={gameCreatorExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id="game-header"
          onClick={() => setGameCreatorExpanded(!gameCreatorExpanded)}
        >
          <Typography>Create game</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GameCreator
            fetchData={fetchData}
            teams={teams}
            setGameCreatorExpanded={setGameCreatorExpanded}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
