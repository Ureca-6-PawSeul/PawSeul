import '@styles/global.css';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { globalStyle } from '@styles/globals';

function App() {
  <BrowserRouter>
    <Global styles={globalStyle} />
  </BrowserRouter>;
}

export default App;
