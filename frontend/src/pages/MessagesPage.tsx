import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

interface Row { status: string; count: number }

export const MessagesPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['messages', 'status-counts'],
    queryFn: async () => (await api.get<Record<string, number>>('/messages/status-counts')).data,
  });

  const rows: Row[] = Object.entries(data ?? {}).map(([status, count]) => ({ status, count }));

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Status Counts</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.status}>
              <TableCell>{r.status}</TableCell>
              <TableCell>{r.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
