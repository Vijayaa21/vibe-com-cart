export function formatCurrency(value) {
  if (value == null || isNaN(Number(value))) return '₹0.00';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(value));
}
