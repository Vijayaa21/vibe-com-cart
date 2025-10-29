import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions } from '@mui/material';
import { formatCurrency } from '../utils/format';

export default function ReceiptModal({ receipt, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>Thank you for your order!</Typography>
        <Typography>Order Total: {formatCurrency(receipt?.total)}</Typography>
        <Typography sx={{ color: 'text.secondary', mt: 1 }}>
          Order Time: {receipt?.timestamp ? new Date(receipt.timestamp).toLocaleString() : ''}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
