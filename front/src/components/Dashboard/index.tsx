import React from 'react'
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@mui/material'
import Row from './Row'

export default function Dashboard({ data }: { data: any }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Team/Player Name</TableCell>
            <TableCell align="center">Games Played</TableCell>
            <TableCell align="center">Wins</TableCell>
            <TableCell align="center">Losses</TableCell>
            <TableCell align="center">Win Ratio</TableCell>
            <TableCell align="center">GF</TableCell>
            <TableCell align="center">GA</TableCell>
            <TableCell align="center">GD</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowdata: any) => (
            <Row data={rowdata} key={rowdata.name} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
