import React from 'react'
import { TableRow, TableHead, TableCell, TableBody, Table } from '@mui/material'

export default function MatchHistoryTable({ data }: { data: any[] }) {
  return (
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>Score</TableCell>
          <TableCell>Opposing team score</TableCell>
          <TableCell> Opposing team name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell>{item.score}</TableCell>
            <TableCell>{item.opposingScore}</TableCell>
            <TableCell>{item.opposingTeam}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
