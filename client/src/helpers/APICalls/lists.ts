import { FetchOptions } from '../../interface/FetchOptions';
import { ListApiData } from '../../interface/ListApiData';

const getAllLists = async (): Promise<ListApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/lists`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { getAllLists };
