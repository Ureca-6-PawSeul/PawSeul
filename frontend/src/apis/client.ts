import axios from 'axios';

interface ResponseBody {
  isSuccess: boolean;
  code: number;
  message: string;
}

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
export type { ResponseBody };
