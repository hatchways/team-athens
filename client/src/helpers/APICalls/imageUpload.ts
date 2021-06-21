import { FetchOptions } from '../../interface/FetchOptions';

const uploadImage = async (image: any): Promise<any> => {
  const body = {
    images: [image],
  };
  const formData = new FormData();

  formData.append('files', image);

  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(formData),
  };

  return await fetch(`/images`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { uploadImage };
