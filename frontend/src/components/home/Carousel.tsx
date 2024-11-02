import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "@emotion/styled";
import Slider, { Settings } from "react-slick";
import { useMemo } from 'react';

interface sliderProps {
    /** 슬라이더 아이템 요소 */
    children: React.ReactNode;
    /** 커스텀 클래스 */
    className?: string;
    /** 자동재생 (속도 설정시 number 타입으로) */
    autoplay?: boolean | number;
    /** 슬라이더 속도 */
    speed?: number;
    /** 반복 여부 */
    loop?: boolean;
  }

export const Carousel = ({
    children,
    className,
    autoplay = true,
    speed = 500,
    loop = true,
}:sliderProps) => {

    const settings = useMemo<Settings>(
        () => ({
          dots: true,
          infinite: loop,
          speed: speed,
          slidesToShow: 1,
          autoplay: Boolean(autoplay),
          autoplaySpeed: typeof autoplay === 'boolean' ? 3500 : autoplay,
        }),
        [autoplay, loop, speed],
      );


      return (
        <SlideWrapper className={className}>
          <Slider {...settings}>{children}</Slider>
        </SlideWrapper>
      );
}

const SlideWrapper = styled.section`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;