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
export default function TeamCreator() {
  const [name, setName] = React.useState('')
  const [players, setPlayers] = React.useState([])
  const [chosenPlayers, setChosenPlayers] = React.useState<number[]>([])

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
    console.log({ name })
    const res = await myAxios.post('/teams', { name, players: chosenPlayers })
    console.log(res)
  }
  const effect = async () => {
    const res = await myAxios.get('/players')
    if (res.status == 200) {
      setPlayers(res.data)
    }
  }
  React.useEffect(() => {
    effect()
  }, [])
  return (
    <FormGroup>
      <InputLabel htmlFor="player-creation-input">Team Name:</InputLabel>
      <TextField
        required
        id="team-creation-input"
        label="Required"
        placeholder="Team Name"
        margin="normal"
        value={name}
        onChange={handleNameChange}
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
