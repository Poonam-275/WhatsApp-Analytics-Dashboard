import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import CampaignIcon from '@mui/icons-material/Campaign';
import InsightsIcon from '@mui/icons-material/Insights';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export const Sidebar: React.FC<{ open: boolean }> = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: 'Dashboard', icon: <DashboardIcon />, to: '/dashboard' },
    { label: 'Messages', icon: <MessageIcon />, to: '/messages' },
    { label: 'Campaigns', icon: <CampaignIcon />, to: '/campaigns' },
    { label: 'Analytics', icon: <InsightsIcon />, to: '/analytics' },
  ];

  return (
    <Drawer variant="persistent" open={open} sx={{ width: drawerWidth, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
      <Toolbar />
      <List>
        {items.map((item) => (
          <ListItemButton key={item.to} selected={location.pathname.startsWith(item.to)} onClick={() => navigate(item.to)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
