import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Campaign { id: string; name: string; status: string }

export const CampaignsPage: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => (await api.get<Campaign[]>('/campaigns')).data,
  });

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Campaigns</Typography>
      <List>
        {(data ?? []).map((c) => (
          <ListItem key={c.id}>
            <ListItemText primary={c.name} secondary={c.status} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
