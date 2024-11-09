// Format the total price based on quantity
export const formatPrice = (price, qty = 1) => {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price * qty);
};
