import { patchUserOrder } from '@/apis/order';
import PaymentLoading from '@/components/payment/PaymentLoading';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const successMessage = '결제가 완료되었습니다.';
  const navigate = useNavigate();

  useEffect(() => {
    const handlePatchOrder = async () => {
      if (orderId && paymentKey && amount) {
        setIsLoading(true);
        try {
          const patchData = {
            orderId: orderId,
            tossOrderKey: paymentKey,
            price: parseInt(amount),
          };
          await patchUserOrder(patchData);
          alert(successMessage);
          navigate('/mypage/order');
        } catch (error) {
          console.error('Error fetching payment:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handlePatchOrder();
  }, [amount, navigate, orderId, paymentKey]);

  if (isLoading) {
    return <PaymentLoading />;
  }

  return null;
};
