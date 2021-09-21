import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayerCreator from './PlayerCreator'
import TeamCreator from './TeamCreator'

export default function Creators() {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Create player</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlayerCreator />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Create team</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TeamCreator />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
