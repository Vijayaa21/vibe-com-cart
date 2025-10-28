import { Container, Typography, IconButton, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress, Alert } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function CartView() {
  const { cart, loading, error, removeFromCart } = useContext(CartContext);

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
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>₹{item.price * item.quantity}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => removeFromCart(item.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="h6" sx={{ mt: 2 }}>Total: ₹{cart.total}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} href="/checkout">Proceed to Checkout</Button>
        </>
      )}
    </Container>
  );
}
