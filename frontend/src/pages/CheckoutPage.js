import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';
import { CartContext } from '../contexts/CartContext';
import axios from 'axios';

export default function CheckoutPage() {
  const [receipt, setReceipt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { cart, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const cartItems = cart.products.map(p => ({
      qty: p.quantity,
      product: {
        id: p.id,
        price: p.price,
        title: p.title
      }
    }));
    
    const res = await axios.post('/api/checkout', { cartItems, ...formData });
    setReceipt(res.data.receipt);
    setModalOpen(true);
    
    // Refresh cart after successful checkout
    await fetchCart();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // Redirect to home after successful checkout
    navigate('/');
  };

  return (
    <>
      <CheckoutForm onSubmit={handleSubmit} />
      <ReceiptModal receipt={receipt} open={modalOpen} onClose={handleCloseModal} />
    </>
  );
}
