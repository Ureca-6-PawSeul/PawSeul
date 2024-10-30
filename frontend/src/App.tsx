import '@styles/global.css';
import { Global } from '@emotion/react';
import { globalStyle } from '@styles/globals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@components/common/Layout';

import Login from '@pages/Login';
import Home from '@pages/Home';
import Search from '@pages/Search';
import Store from '@pages/Store';
import Mypage from '@pages/Mypage';
import Detail from '@pages/Store/Detail';
import Payment from '@pages/Payment';
import Health from '@pages/Health';
import Cart from '@pages/Cart';
import { OrderHistoryPage } from '@pages/Mypage/Order';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Global styles={globalStyle} />
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/health" element={<Health />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/order" element={<OrderHistoryPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/store/detail/:productId" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
