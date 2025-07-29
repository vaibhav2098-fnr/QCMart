// apiCall.ts
import axios from 'axios';
import { BASE_SERVER_URL } from '../../constants'; // change this path

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiCallOptions {
  method: Method;
  endpoint: string;
  data?: any;
  token?: string;
  isMultipart?: boolean;
  params?: any;
  headers?: Record<string, string>;
}

export const apiCall = async ({
  method,
  endpoint,
  data = null,
  token = '',
  isMultipart = false,
  params = {},
  headers = {},
}: ApiCallOptions) => {
  const url = `${BASE_SERVER_URL}${endpoint}`;

  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: {
        Accept: 'application/json',
        ...(isMultipart
          ? {} // Let axios set the correct boundary for multipart
          : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('API Call Error:', error?.response?.data || error.message);
    throw error?.response?.data || { message: 'Something went wrong!' };
  }
};


// usage--------------------
// await apiCall({
//   method: 'GET',
//   endpoint: '/products',
//   token: yourAccessToken,
//   params: { category: 'shoes' },
// })

// sMultipart: true,----------

// const formData = new FormData();
// formData.append('image', {
//   uri: imageUri,
//   type: 'image/jpeg',
//   name: 'photo.jpg',
// });

// await apiCall({
//   method: 'POST',
//   endpoint: '/upload/image',
//   data: formData,
//   token: yourAccessToken,
//   isMultipart: true,
// });