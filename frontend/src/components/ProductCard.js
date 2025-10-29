import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Skeleton, Fade } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { formatCurrency } from '../utils/format';

export default function ProductCard({ product, onAddToCart, isAdding }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Start loading the image
    const img = new Image();
    img.src = product.thumbnail || 'https://via.placeholder.com/500?text=No+Image';
    img.onload = () => {
      setImageSrc(img.src);
      setImageLoaded(true);
    };
  }, [product.thumbnail]);

  return (
    <Card className="product-card">
      <Box sx={{ position: 'relative', height: 200 }}>
        {!imageLoaded && (
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height={200} 
            animation="wave"
            sx={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}
        <Fade in={imageLoaded} timeout={500}>
          <CardMedia
            className="product-image"
            component="img"
            alt={product.title}
            height="200"
            image={imageSrc}
            sx={{
              objectFit: 'cover',
              backgroundColor: 'rgba(0,0,0,0.03)',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%'
            }}
          />
        </Fade>
      </Box>
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
          {product.title}
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
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" className="price">
            {formatCurrency(product.price)}
          </Typography>
          <Button
            variant="contained"
            onClick={() => onAddToCart(product.id)}
            disabled={isAdding}
            startIcon={<ShoppingCartIcon />}
            sx={{ 
              minWidth: '120px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            {isAdding ? 'Adding...' : 'Add'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}