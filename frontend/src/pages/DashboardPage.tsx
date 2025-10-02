import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Grid, Paper, Typography } from '@mui/material';
import { formatNumber } from '../utils/format';

export const DashboardPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['analytics', 'totals'],
    queryFn: async () => (await api.get<{ total: number }>('/analytics/totals')).data,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Total Messages</Typography>
          <Typography variant="h4">{formatNumber(data?.total ?? 0)}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
