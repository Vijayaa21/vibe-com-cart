import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';
import { formatCurrency } from '../utils/format';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  Alert
} from '@mui/material';

export default function CheckoutForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [receipt, setReceipt] = useState(null);
  
  const { cart, loading } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      // Prepare cartItems for backend expected shape
      const cartItems = (cart.products || []).map(p => ({ qty: p.quantity || 1, product: { price: p.price || 0, id: p.id, title: p.title } }));
      const payload = {
        customer: { name, email, phone, address1, address2, city, state: stateRegion, zip },
        paymentMethod,
        cartItems
      };
      const res = await axios.post('/api/checkout', payload);
      setReceipt(res.data.receipt || { total: cart.total, timestamp: new Date().toISOString() });
      if (typeof onSubmit === 'function') onSubmit(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  const deliveryFee = 99;
  const orderTotal = (cart.total || 0) + deliveryFee;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Checkout</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {receipt ? (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Order Confirmed</Typography>
          <Typography>Amount paid: {formatCurrency(receipt?.total)}</Typography>
          <Typography sx={{ color: 'text.secondary', mt: 1 }}>Order Time: {new Date(receipt?.timestamp).toLocaleString()}</Typography>
        </Paper>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper className="order-panel" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Contact</Typography>
                <TextField fullWidth required label="Name" value={name} onChange={e => setName(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth required label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Phone" value={phone} onChange={e => setPhone(e.target.value)} sx={{ mb: 2 }} />

                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>Shipping Address</Typography>
                <TextField fullWidth required label="Address line 1" value={address1} onChange={e => setAddress1(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth label="Address line 2" value={address2} onChange={e => setAddress2(e.target.value)} sx={{ mb: 2 }} />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}><TextField fullWidth label="City" value={city} onChange={e => setCity(e.target.value)} /></Grid>
                  <Grid item xs={6}><TextField fullWidth label="State/Region" value={stateRegion} onChange={e => setStateRegion(e.target.value)} /></Grid>
                </Grid>
                <TextField fullWidth label="ZIP / Postal code" value={zip} onChange={e => setZip(e.target.value)} sx={{ mb: 2 }} />

                <Divider sx={{ my: 2 }} />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Payment method</FormLabel>
                  <RadioGroup value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                    <FormControlLabel value="card" control={<Radio />} label="Credit / Debit / Netbanking" />
                    <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                    <FormControlLabel value="cod" control={<Radio />} label="Cash on delivery" />
                  </RadioGroup>
                </FormControl>

                <Box sx={{ mt: 2 }}>
                  <Button type="submit" variant="contained" disabled={submitting}>
                    {submitting ? <CircularProgress size={20} /> : 'Place Order'}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper className="order-panel" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Order Summary</Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}><CircularProgress /></Box>
                ) : (
                  <>
                    {(cart.products || []).map(p => (
                      <Box key={p.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{p.title} × {p.quantity}</Typography>
                        <Typography variant="body2">{formatCurrency(p.price * p.quantity)}</Typography>
                      </Box>
                    ))}

                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Bag total</Typography>
                      <Typography>{formatCurrency(cart.total)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Delivery</Typography>
                      <Typography>{formatCurrency(deliveryFee)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6">Order Total</Typography>
                      <Typography variant="h6" className="total">{formatCurrency(orderTotal)}</Typography>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
}
