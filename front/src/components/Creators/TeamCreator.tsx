import * as React from 'react'
import {
  Button,
  TextField,
  InputLabel,
  FormGroup,
  Select,
  MenuItem,
} from '@mui/material'
import myAxios from '../../utils/myAxios'
export default function TeamCreator({
  fetchData,
  players,
  setTeamCreatorExpanded,
}: {
  fetchData: () => Promise<any>
  players: any[]
  setTeamCreatorExpanded: (expanded: boolean) => void
}) {
  const [name, setName] = React.useState('')
  const [chosenPlayers, setChosenPlayers] = React.useState<number[]>([])
  const [error, setError] = React.useState('')

  const handleNameChange = (event: any) => {
    setName(event.target.value)
  }
  const handleChosenPlayersChange = (event: any, index: number) => {
    setChosenPlayers([
      ...chosenPlayers.slice(0, index),
      event.target.value,
      ...chosenPlayers.slice(index + 1),
    ])
  }
  const handleClick = async () => {
    const res = await myAxios.post('/teams', { name, players: chosenPlayers })
    if (!!res.data.error) {
      setError(res.data.error.msg)
    } else {
      setTeamCreatorExpanded(false)
    }
    fetchData()
  }
  return (
    <FormGroup>
      <InputLabel htmlFor="player-creation-input">Team Name:</InputLabel>
      <TextField
        required
        error={!!error}
        id="team-creation-input"
        label="Required"
        placeholder="Team Name"
        margin="normal"
        value={name}
        onChange={handleNameChange}
        helperText={error}
      />
      {[
        {
          data: players,
          disabled: false,
          required: true,
        },
        {
          data:
            chosenPlayers.length > 0
              ? players.filter(({ id }) => id !== chosenPlayers[0])
              : [],
          disabled: chosenPlayers.length === 0,
          required: false,
        },
      ].map(
        (
          {
            data,
            disabled,
            required,
          }: { data: any; disabled: boolean; required: boolean },
          index: number,
        ) => (
          <Select
            id={`chosen-player-${index}`}
            value={(chosenPlayers[index] || '').toString()}
            margin="dense"
            onChange={(e) => handleChosenPlayersChange(e, index)}
            key={index}
            disabled={disabled}
            required={required}
          >
            {data.map(({ id, name }: { id: number; name: string }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        ),
      )}
      <Button variant="outlined" onClick={handleClick}>
        Create
      </Button>
    </FormGroup>
  )
}
