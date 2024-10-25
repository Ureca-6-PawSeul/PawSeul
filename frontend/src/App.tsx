import '@styles/global.css';
import { Global } from '@emotion/react';
import { globalStyle } from '@styles/globals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@components/common/Layout';

import Login from '@pages/Login';
import PetAdd from '@components/Login/PetAdd';
// import Home from '@pages/Home';
// import Search from '@pages/Search';
// import Store from '@pages/Store';
// import Mypage from '@pages/Mypage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Global styles={globalStyle} />
        <Routes>
          {/* <Route path="/*" element={<Login />} /> */}
          <Route path="/*" element={<PetAdd />} />
          {/* <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mypage" element={<Mypage />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
