import { FetchOptions } from '../../interface/FetchOptions';
import { ListApiData } from '../../interface/ListApiData';
import { ListProductApiData } from '../../interface/Product';

const getPubicLists = async (): Promise<ListApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/public-lists`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

const getListProducts = async (listID: string): Promise<ListProductApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/public-lists/${listID}/products`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { getPubicLists, getListProducts };
