import * as React from 'react'
import { Button, TextField, InputLabel, FormGroup } from '@mui/material'
import myAxios from '../../utils/myAxios'
export default function PlayerCreator() {
  const [name, setName] = React.useState('')
  const handleChange = (event: any) => {
    setName(event.target.value)
  }
  const handleClick = async () => {
    const res = await myAxios.post('/players', { name })
    console.log(res)
  }
  return (
    <FormGroup>
      <InputLabel htmlFor="player-creation-input">Player Name:</InputLabel>
      <TextField
        required
        id="player-creation-input"
        label="Required"
        placeholder="Player Name"
        margin="normal"
        value={name}
        onChange={handleChange}
      />
      <Button variant="outlined" onClick={handleClick}>
        Create
      </Button>
    </FormGroup>
  )
}
