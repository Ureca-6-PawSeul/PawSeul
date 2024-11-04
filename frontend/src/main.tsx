import { createRoot } from 'react-dom/client';
import App from './App';
import { setupWorker } from 'msw/browser';
import { handlers } from './mocks/handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

