import * as React from 'react'
import { Button, TextField, InputLabel, FormGroup } from '@mui/material'
import myAxios from '../../utils/myAxios'
export default function PlayerCreator({
  fetchData,
  setPlayerCreatorExpanded,
}: {
  fetchData: () => Promise<any>
  setPlayerCreatorExpanded: (expanded: boolean) => void
}) {
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState('')
  const handleChange = (event: any) => {
    setName(event.target.value)
  }
  const handleClick = async () => {
    const res = await myAxios.post('/players', { name })
    if (!!res.data.error) {
      setError(res.data.error.msg)
    } else {
      setPlayerCreatorExpanded(false)
    }
    fetchData()
  }
  return (
    <FormGroup>
      <InputLabel htmlFor="player-creation-input">Player Name:</InputLabel>
      <TextField
        required
        error={!!error}
        id="player-creation-input"
        label="Required"
        placeholder="Player Name"
        margin="normal"
        value={name}
        onChange={handleChange}
        helperText={error}
      />
      <Button variant="outlined" onClick={handleClick}>
        Create
      </Button>
    </FormGroup>
  )
}
