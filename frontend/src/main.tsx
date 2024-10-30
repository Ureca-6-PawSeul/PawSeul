import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { setupWorker } from 'msw/browser';
import { handlers } from './mocks/handler';

const worker = setupWorker(...handlers);
async function enableMocking() {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

  return worker.start();
}

const queryClient = new QueryClient();


enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)
});

