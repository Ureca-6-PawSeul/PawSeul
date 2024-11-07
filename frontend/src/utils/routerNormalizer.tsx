import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface RouteNormalizerProps {
  children: ReactNode;
}

const RouteNormalizer = ({ children }: RouteNormalizerProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const lowerCasePath = location.pathname.toLowerCase();
    if (location.pathname !== lowerCasePath) {
      navigate(lowerCasePath, { replace: true });
    }
  }, [location, navigate]);

  return <>{children}</>;
};

export default RouteNormalizer;
