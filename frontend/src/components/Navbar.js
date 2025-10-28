import { AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const count = (cart?.products || []).reduce((s, p) => s + (p.quantity || 0), 0);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Vibe Commerce
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon sx={{ color: 'inherit' }} />}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/products"
            startIcon={<StorefrontIcon sx={{ color: 'inherit' }} />}
          >
            Products
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/checkout"
            startIcon={<PaymentIcon sx={{ color: 'inherit' }} />}
          >
            Checkout
          </Button>
          <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCartIcon sx={{ color: 'inherit' }} />}>
            <Badge badgeContent={count} color="secondary">Cart</Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
