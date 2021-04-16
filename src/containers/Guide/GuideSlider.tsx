import React, { ReactElement, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import GuidePage from './GuidePage/GuidePage';
import { guides } from './GuidePage/guides';
import 'swiper/swiper.scss';
import Result from './GuideResult';
import completedResultOrange from '../../assets/illustrations/guide/completed-result.svg';
import * as Styled from './Styled';

const GuideSlider = (): ReactElement => {
  // when images loaded
  const [imagesReady, setImagesReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const resultPage = (
    <SwiperSlide key={Math.random().toString()}>
      <Result
        msg="You're ready to go!"
        imgPath={completedResultOrange}
        initRedirect={isLastSlide}
      />
    </SwiperSlide>
  );

  const carouselItems = guides
    .map(({ title, description, imgPath }, i) => (
      <SwiperSlide key={i.toString()}>
        <GuidePage title={title} description={description} imgPath={imgPath} />
      </SwiperSlide>
    ))
    .concat([resultPage]);

  return (
    <>
      <Swiper
        preventInteractionOnTransition
        style={{
          visibility: imagesReady ? 'visible' : 'hidden',
        }}
        onImagesReady={() => setImagesReady(true)}
        allowSlidePrev={!isLastSlide}
        allowSlideNext={!isLastSlide}
        onSlideChange={({ activeIndex, isEnd }) => {
          if (isEnd) setIsLastSlide(true);
          setActiveIndex(activeIndex);
        }}
        slidesPerView={1}
      >
        {carouselItems}
      </Swiper>
      <Styled.Pagination
        className="pagination"
        isLastCarouselItem={carouselItems.length - 1 === activeIndex}
      >
        {carouselItems.map((_, i) => (
          <Styled.PaginationItem
            className="pagination__item"
            active={i === activeIndex}
            key={i.toString()}
          />
        ))}
      </Styled.Pagination>
    </>
  );
};

export default GuideSlider;
