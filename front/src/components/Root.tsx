import * as React from 'react'
import Dashboard from './Dashboard'
import Grid from '@mui/material/Grid'
import Creators from './Creators'

export default function Root() {
  return (
    <div style={{ width: '100%' }}>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
        }}
      >
        <Grid item xs={12} sx={{ maxWidth: 1000 }}>
          <Creators />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <h4>Teams & Players</h4>
        </Grid>
        <Grid item xs={12} sx={{ maxWidth: 1000 }}>
          <Dashboard />
        </Grid>
      </Grid>
    </div>
  )
}
