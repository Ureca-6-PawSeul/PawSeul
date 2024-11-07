import '@styles/global.css';
import { Global } from '@emotion/react';
import { globalStyle } from '@styles/globals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@components/common/Layout';

import Main from '@/pages/Main';
import Home from '@pages/Home';
import Search from '@pages/Search';
import Store from '@pages/Store';
import Mypage from '@pages/Mypage';
import Detail from '@pages/Store/Detail';
import Payment from '@pages/Payment';
import Health from '@pages/Health';
import Cart from '@pages/Cart';
import { OrderHistoryPage } from '@pages/Mypage/Order';
import { ReviewHistoryPage } from '@pages/Mypage/Review';
import SignUp from '@pages/Signup/SignUp';
import SignUpResult from '@pages/Signup/Result';
import { PaymentFail } from '@pages/Payment/Fail';
import { PaymentSuccess } from '@pages/Payment/Success';
import Analysis from '@pages/Health/Analysis';
import ErrorPage from '@pages/404';
import HealthResult from '@pages/Health/Result';
import PetInfoModify from '@pages/Mypage/Modify';
import NotFound from '@pages/NotFound';
import RouteNormalizer from './utils/routerNormalizer';

function App() {
  const PrivateRoute = ({ children }) => {
    const token = sessionStorage.getItem('user-storage');
    return token ? children : <Navigate to="/main" />;
  };

  return (
    <BrowserRouter>
      <Layout>
        <Global styles={globalStyle} />
        <RouteNormalizer>
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/result" element={<SignUpResult />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/store"
              element={
                <PrivateRoute>
                  <Store />
                </PrivateRoute>
              }
            />
            <Route
              path="/health"
              element={
                <PrivateRoute>
                  <Health />
                </PrivateRoute>
              }
            />
            <Route
              path="/health/analysis"
              element={
                <PrivateRoute>
                  <Analysis />
                </PrivateRoute>
              }
            />
            <Route
              path="/health/result"
              element={
                <PrivateRoute>
                  <HealthResult />
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <Search />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage"
              element={
                <PrivateRoute>
                  <Mypage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage/order"
              element={
                <PrivateRoute>
                  <OrderHistoryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage/review"
              element={
                <PrivateRoute>
                  <ReviewHistoryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage/pet"
              element={
                <PrivateRoute>
                  <PetInfoModify />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment/success"
              element={
                <PrivateRoute>
                  <PaymentSuccess />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment/fail"
              element={
                <PrivateRoute>
                  <PaymentFail />
                </PrivateRoute>
              }
            />
            "
            <Route
              path="/store/detail/:id"
              element={
                <PrivateRoute>
                  <Detail />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteNormalizer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
