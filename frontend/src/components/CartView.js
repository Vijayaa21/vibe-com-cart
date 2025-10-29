import { Container, Typography, IconButton, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress, Alert, Box } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { formatCurrency } from '../utils/format';

export default function CartView() {
  const { cart, loading, error, removeFromCart, updateQty } = useContext(CartContext);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <CircularProgress />
        </div>
      ) : (cart.products || []).length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>Your cart is empty</Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(cart.products || []).map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small" onClick={() => updateQty(item.id, (item.quantity || 1) - 1)}><Remove /></IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => updateQty(item.id, (item.quantity || 1) + 1)}><Add /></IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>{formatCurrency((item.price || 0) * (item.quantity || 0))}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => removeFromCart(item.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="h6" sx={{ mt: 2 }}>Total: {formatCurrency(cart.total)}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} href="/checkout">Proceed to Checkout</Button>
        </>
      )}
    </Container>
  );
}
