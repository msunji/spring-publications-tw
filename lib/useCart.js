import { useState, useEffect } from 'react';

export default function useCart(store, callback) {
  const cartStore = store(callback);
  const [data, setData] = useState();

  useEffect(() => {
    setData(cartStore);
  }, [cartStore]);

  return data;
}