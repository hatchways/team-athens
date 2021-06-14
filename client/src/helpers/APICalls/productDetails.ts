import { FetchOptions } from '../../interface/FetchOptions';
import { ProductDetails } from '../../interface/ProductDetails';

const productDetails = async (url: string): Promise<ProductDetails> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productUrl: url }),
    credentials: 'include',
  };
  return await fetch(`/scrape`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default productDetails;
