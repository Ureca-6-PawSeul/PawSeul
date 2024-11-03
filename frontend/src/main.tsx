import { createRoot } from 'react-dom/client';
import App from './App';

import { setupWorker } from 'msw/browser';
import { handlers } from './mocks/handler';

const worker = setupWorker(...handlers);
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />);
});
