import React from 'react'
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  IconButton,
} from '@mui/material'

import myAxios from '../../utils/myAxios'
import MatchHistoryTable from './MatchHistoryTable'
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'

export default function Row({ data }: { data: any }) {
  const [expand, setExpand] = React.useState(false)
  const [teams, setTeams] = React.useState([])
  const [matches, setMatches] = React.useState([])
  const effect = async () => {
    const res = await myAxios.get(
      `/${data.is_team ? 'teams' : 'players'}/${data.id}/games`,
    )
    if (data.is_team) {
      setMatches(res.data.teamGames || [])
    } else {
      setTeams(res.data.teams || [])
    }
  }
  React.useEffect(() => {
    effect()
  }, [])
  return (
    <>
      <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={() => setExpand(!expand)}
      >
        <TableCell component="th" scope="row" align="center">
          {data.name}
        </TableCell>
        <TableCell align="center">{data.games_played}</TableCell>
        <TableCell align="center">{data.wins}</TableCell>
        <TableCell align="center">{data.losses}</TableCell>
        <TableCell align="center">{data.win_ratio}</TableCell>
        <TableCell align="center">{data.gf}</TableCell>
        <TableCell align="center">{data.ga}</TableCell>
        <TableCell align="center">{data.gd}</TableCell>
        <TableCell align="center">
          <IconButton size="small">
            {expand ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h5" gutterBottom component="div">
                Match History
              </Typography>
              {data.is_team ? (
                <MatchHistoryTable data={matches} />
              ) : (
                teams.map((team: any) => (
                  <>
                    <Typography variant="h6" gutterBottom component="div">
                      As {team.name}
                    </Typography>
                    <MatchHistoryTable data={team.teamGames} />
                  </>
                ))
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
