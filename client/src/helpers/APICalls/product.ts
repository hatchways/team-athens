import { FetchOptions } from '../../interface/FetchOptions';
import { Product } from '../../interface/Product';
import { ProductApiData } from '../../interface/ProductApiData';

const createProduct = async (product: Product, listID: string): Promise<ProductApiData> => {
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

const getAllProductsFromList = async (listID: string): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/products/${listID}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const deleteProduct = async (listID: string, productId: string): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/products/${listID}/${productId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { createProduct, getAllProductsFromList, deleteProduct };
