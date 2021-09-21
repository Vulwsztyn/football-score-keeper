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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Create player</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlayerCreator
            fetchData={async () => {
              fetchPlayers()
              fetchData()
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Create team</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TeamCreator
            fetchData={async () => {
              fetchTeams()
              fetchData()
            }}
            players={players}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Create game</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GameCreator fetchData={fetchData} teams={teams} />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
