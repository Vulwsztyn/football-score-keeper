import * as React from 'react'
import {
  Button,
  FormGroup,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from '@mui/material'
import myAxios from '../../utils/myAxios'
export default function GameCreator({
  fetchData,
  teams,
  setGameCreatorExpanded,
}: {
  fetchData: () => Promise<any>
  teams: any[]
  setGameCreatorExpanded: (expanded: boolean) => void
}) {
  const [teamGames, setTeamGames] = React.useState<any[]>([
    { score: 0 },
    { score: 0 },
  ])
  const [error, setError] = React.useState('')

  const handleTeamGamesChange = (value: any, index: number, key: string) => {
    setTeamGames([
      ...teamGames.slice(0, index),
      {
        ...teamGames[index],
        [key]: value,
      },
      ...teamGames.slice(index + 1),
    ])
  }
  const handleClick = async () => {
    const res = await myAxios.post('/games', { teamGames })
    if (!!res.data.error) {
      setError(res.data.error.msg)
    } else {
      setGameCreatorExpanded(false)
    }
    fetchData()
  }

  return (
    <FormGroup>
      <FormHelperText error>{error}</FormHelperText>
      {[
        {
          data: teams.filter(
            ({ id }: { id: number }) => id !== teamGames[1].team,
          ),
        },
        {
          data: teams.filter(
            ({ id }: { id: number }) => id !== teamGames[0].team,
          ),
        },
      ].map(({ data }: { data: any }, index: number) => (
        <>
          <Select
            id={`chosen-team-${index}`}
            value={(teamGames[index].team || '').toString()}
            margin="dense"
            onChange={(e) =>
              handleTeamGamesChange(e.target.value, index, 'team')
            }
            key={index}
            required={true}
          >
            {data.map(({ id, name }: { id: number; name: string }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={teamGames[index].score}
            onChange={(e) =>
              handleTeamGamesChange(Number(e.target.value), index, 'score')
            }
          />
          <FormGroup
            row={true}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              m: 1,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                handleTeamGamesChange(
                  teamGames[index].score - 1,
                  index,
                  'score',
                )
              }
            >
              -
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                handleTeamGamesChange(
                  teamGames[index].score + 1,
                  index,
                  'score',
                )
              }
            >
              +
            </Button>
          </FormGroup>
        </>
      ))}
      <Button variant="outlined" onClick={handleClick}>
        Create
      </Button>
    </FormGroup>
  )
}
