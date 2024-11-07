import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProductType } from '@/assets/types/ProductType';
import { Product } from '../store/Product';
import styled from '@emotion/styled';

function Card({ productList }: { productList: ProductType[] }) {
  // console.log(productList);
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`,
      );
    },
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {productList.map((product) => (
            <SlideWrapper key={product.productId}>
          <Product
            productId={product.productId}
            title={product.title}
            price={product.price}
            productImg={product.productImg}
          />
             </SlideWrapper>
        ))}
      </Slider>
      //{' '}
    </div>
  );
}

export default Card;

const SlideWrapper = styled.section`
  padding: 0 10px; // 각 슬라이드의 좌우 여백
  box-sizing: border-box;
  max-height: 360px;
`;
