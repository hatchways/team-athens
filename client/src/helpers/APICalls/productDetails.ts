import { FetchOptions } from '../../interface/FetchOptions';
import { ProductDetailApiData } from '../../interface/ProductDetailApiData';

const productDetails = async (url: string): Promise<ProductDetailApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productUrl: url }),
    credentials: 'include',
  };
  return await fetch(`/scrape`, fetchOptions)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch(() => ({ error: { message: 'Unable to connect to server. Please try again' } }));
};

export default productDetails;
