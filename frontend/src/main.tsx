import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box, Grid, Paper, CircularProgress } from '@mui/material';
import { MessageStats } from '@whatsapp-analytics/shared';

const theme = createTheme({ palette: { mode: 'light' } });

function useStats() {
  const [data, setData] = React.useState<MessageStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const url = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/stats`;
    fetch(url)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => setData(json))
      .catch((e: unknown) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
}

function Dashboard() {
  const { data, loading, error } = useStats();

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!data) return <Typography>No data</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>WhatsApp Message Analytics</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total" value={data.total} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Text" value={data.byType.text} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Image" value={data.byType.image} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Audio" value={data.byType.audio} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Video" value={data.byType.video} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Document" value={data.byType.document} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Sticker" value={data.byType.sticker} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Read" value={data.byStatus.read} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Delivered" value={data.byStatus.delivered} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Sent" value={data.byStatus.sent} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Failed" value={data.byStatus.failed} /></Grid>
      </Grid>
    </Container>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  </React.StrictMode>
);
