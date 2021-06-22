// import { FetchOptions } from '../../interface/FetchOptions';

// body is not string in this request
interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: any;
  credentials: RequestCredentials;
}

const uploadImage = async (images: any): Promise<any> => {
  const fd = new FormData();

  for (const image of images) {
    fd.append('images', image, `${image.name}`);
  }

  const fetchOptions: FetchOptions = {
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data; boundary=AaB03x' },
    credentials: 'include',
    body: fd,
  };

  return await fetch(`/images`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export { uploadImage };
