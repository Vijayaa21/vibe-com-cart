import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Skeleton, Fade } from '@mui/material';
import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';
import { formatCurrency } from '../utils/format';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, addingIds } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {[1, 2, 3, 4, 5, 6].map(key => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <Card>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="rectangular" height={36} sx={{ mt: 2, borderRadius: '999px' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {products.map(p => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
          <Card className="product-card">
            <CardMedia
              className="product-image"
              component="img"
              alt={p.title}
              height="200"
              image={p.thumbnail || 'https://via.placeholder.com/500?text=No+Image'}
              sx={{
                objectFit: 'cover',
                backgroundColor: 'rgba(0,0,0,0.03)'
              }}
            />
            <CardContent className="card-content">
              <Typography 
                gutterBottom 
                variant="h6" 
                className="vibe-title"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '3.6em'
                }}
              >
                {p.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '2.5em'
                }}
              >
                {p.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" className="price">
                  {formatCurrency(p.price)}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => addToCart(p.id, 1)}
                  disabled={addingIds.includes(p.id)}
                  startIcon={<ShoppingCartIcon />}
                  sx={{ 
                    minWidth: '120px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {addingIds.includes(p.id) ? 'Adding...' : 'Add'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
