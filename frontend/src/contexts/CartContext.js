import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [addingIds, setAddingIds] = useState([]); // track per-product adding
  const [error, setError] = useState(null);

  // snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  useEffect(() => {
    fetchCart();
  }, []);

  const showSnack = (message, severity = 'success') => {
    setSnackMsg(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('/api/carts');
      const data = res.data;
      let chosen = null;
      if (data?.carts && Array.isArray(data.carts)) {
        chosen = data.carts.find(c => c.userId === 1) || data.carts[0] || { products: [], total: 0 };
      } else if (Array.isArray(data)) {
        chosen = data[0] || { products: [], total: 0 };
      } else {
        chosen = data || { products: [], total: 0 };
      }
      const products = chosen.products || [];
      const computedTotal = (products || []).reduce((s, it) => s + ((it.price || 0) * (it.quantity || 0)), 0);
      setCart({ products, total: chosen.total ?? computedTotal });
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load cart');
      setCart({ products: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id, qty = 1) => {
    try {
      setAddingIds(prev => [...prev, id]);
      await axios.post('/api/carts', { userId: 1, products: [{ id, quantity: qty }] });
      await fetchCart();
      showSnack('Item added to cart');
    } catch (err) {
      showSnack(err?.response?.data?.message || 'Failed to add to cart', 'error');
    } finally {
      setAddingIds(prev => prev.filter(x => x !== id));
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`/api/carts/${id}`);
      await fetchCart();
      showSnack('Item removed from cart');
    } catch (err) {
      showSnack(err?.response?.data?.message || 'Failed to remove item', 'error');
    }
  };

  // Optimistic quantity update: update local cart state immediately,
  // then POST an update to the backend and refresh. On failure rollback.
  const updateQty = async (productId, newQty) => {
    if (newQty < 1) return;
    // snapshot
    const prevCart = JSON.parse(JSON.stringify(cart));
    try {
      // optimistic update locally
      const products = (cart.products || []).map(p => p.id === productId ? { ...p, quantity: newQty } : p);
      const computedTotal = (products || []).reduce((s, it) => s + ((it.price || 0) * (it.quantity || 0)), 0);
      setCart({ products, total: computedTotal });

      // notify backend - try to set desired qty by adding product with qty (dummyjson will respond)
      await axios.post('/api/carts', { userId: 1, products: [{ id: productId, quantity: newQty }] });
      // refresh authoritative cart
      await fetchCart();
      showSnack('Quantity updated');
    } catch (err) {
      // rollback
      setCart(prevCart);
      showSnack(err?.response?.data?.message || 'Failed to update quantity', 'error');
    }
  };

  const value = {
    cart,
    loading,
    error,
    addingIds,
    fetchCart,
  addToCart,
  removeFromCart,
  updateQty,
    showSnack
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  );
}

export default CartProvider;
