export const useCurrency = () => {
  const formatPrice = (price: number | string) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(Number(price));
  };

  return {
    formatPrice,
  };
};
