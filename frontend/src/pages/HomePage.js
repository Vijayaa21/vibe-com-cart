import { Container, Typography, Box } from '@mui/material';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>Welcome to Vibe Commerce</Typography>
        <Typography variant="h6">Shop and checkout with ease!</Typography>
      </Box>
      <ProductGrid />
    </Container>
  );
}
