import { FetchOptions } from '../../interface/FetchOptions';
import { Product } from '../../interface/Product';

const createProduct = async (product: Product, listID: string): Promise<Product> => {
  const body = {
    productDetails: product,
  };
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  };
  return await fetch(`/products/${listID}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { createProduct };
