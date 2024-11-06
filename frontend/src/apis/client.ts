import axios from 'axios';

interface ResponseBody {
  isSuccess: boolean;
  code: number;
  message: string;
}

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  withCredentials: true,
});

const navigateToLogin = () => {
  window.location.href = '/main';
};

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      navigateToLogin();
    }
    return Promise.reject(error);
  },
);

export default client;
export type { ResponseBody };
