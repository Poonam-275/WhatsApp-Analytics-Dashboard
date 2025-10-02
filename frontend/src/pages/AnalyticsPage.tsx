import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Daily { date: string; count: number }

export const AnalyticsPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['stats', 'daily'],
    queryFn: async () => (await api.get<{ daily: Daily[] }>('/stats')).data,
  });

  return (
    <Paper sx={{ p: 2, height: 360 }}>
      <Typography variant="h6" gutterBottom>Daily Messages</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data?.daily ?? []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};
