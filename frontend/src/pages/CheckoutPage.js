import { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import ReceiptModal from '../components/ReceiptModal';
import axios from 'axios';

export default function CheckoutPage() {
  const [receipt, setReceipt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (formData) => {
    // Ideally, fetch products from cart state/context
    const cartItems = []; // Fetch from context/store or API as needed
    const res = await axios.post('/api/checkout', { cartItems, ...formData });
    setReceipt(res.data.receipt);
    setModalOpen(true);
  };

  return (
    <>
      <CheckoutForm onSubmit={handleSubmit} />
      <ReceiptModal receipt={receipt} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
