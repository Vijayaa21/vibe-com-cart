import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 4, background: 'linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ mb: { xs: 1, sm: 0 } }}>© {new Date().getFullYear()} Vibe Commerce</Typography>
        <Box>
          <Link href="#" color="inherit" sx={{ mr: 2 }}>About</Link>
          <Link href="#" color="inherit" sx={{ mr: 2 }}>Contact</Link>
          <Link href="#" color="inherit">Privacy</Link>
        </Box>
      </Container>
    </Box>
  );
}
