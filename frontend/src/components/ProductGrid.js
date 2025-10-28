import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const { addToCart, addingIds } = useContext(CartContext);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data.products || []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {products.map(p => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
          <Card>
            <CardMedia className="product-image" component="img" alt={p.title} height="180" image={p.thumbnail} />
            <CardContent className="card-content">
              <Typography gutterBottom variant="h6" className="vibe-title">{p.title}</Typography>
              <Typography variant="body2" className="price">₹{p.price}</Typography>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => addToCart(p.id)}
                disabled={addingIds.includes(p.id)}
              >
                {addingIds.includes(p.id) ? 'Adding...' : 'Add to Cart'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
