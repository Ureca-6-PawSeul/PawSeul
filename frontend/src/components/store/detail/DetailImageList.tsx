import { useState } from 'react';
import styled from '@emotion/styled';
import DetailButton from '@components/store/detail/DetailButton';
import { colors } from '@styles/colors';

const DetailImageList = ({ images }: { images: string[] }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleMoreButtonClick = () => {
    setIsDetailOpen((prev) => !prev);
  };

  return (
    <>
      <ImageWrapper isOpen={isDetailOpen}>
        {!isDetailOpen && <OverLay />}
        {images.map((img, index) => (
          <Image key={index} src={img} alt={`description_img_${index}`} />
        ))}
      </ImageWrapper>
      <DetailButton
        handleButtonClick={handleMoreButtonClick}
        colorCode={colors.Gray400}
      >
        {isDetailOpen ? '상품 설명 접기' : '상품 설명 더보기'}
      </DetailButton>
    </>
  );
};

const ImageWrapper = styled.div<{ isOpen: boolean }>`
  position: relative;
  margin-bottom: 50px;
  ${(props) =>
    props.isOpen
      ? `
          height: 100%;
          overflow-y: auto;
        `
      : `
          height: 500px;
          overflow-y: hidden;
        `};
`;

const OverLay = styled.div`
  height: 100%;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  justify-content: center;
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.1),
    rgb(255, 255, 255)
  );
`;

const Image = styled.img<{
  widthPer?: number;
  height?: number;
}>`
  object-fit: cover;
  width: ${({ widthPer }) => (widthPer ? `${widthPer}%` : '100%')};
`;

export default DetailImageList;
