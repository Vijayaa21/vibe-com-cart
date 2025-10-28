import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions } from '@mui/material';

export default function ReceiptModal({ receipt, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Confirmation</DialogTitle>
      <DialogContent>
        <Typography>Total: ₹{receipt?.total}</Typography>
        <Typography>Timestamp: {receipt?.timestamp}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
