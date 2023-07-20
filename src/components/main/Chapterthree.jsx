import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Chapter,
  DirectionButton,
  StyleBody,
  VideoContainer,
  VideoItem,
  WatchMore,
  WatchMoreContainer
} from '../style/Style';
import { useNavigate } from 'react-router';
import { Header } from '../style/Header';
import { styled } from 'styled-components';

export const fetchVideosThree = async (category, pageToken = '') => {
  const respones = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: 'AIzaSyA0bHsrm90pIK2J9anLy_b2LTg8wbsJWck',
      maxResults: 1,
      pageToken
    }
  });
  console.log(respones);

  return respones.data;
};

export const Chapterthree = () => {
  const [yotube, setYoutube] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery('youtubeThree', () => fetchVideosThree('자취 노하우'));
  const watchMore = () => {
    navigate('/VideoList');
  };

  const scrollContainer = useRef();
  const handleScroll = (direction) => {
    if (scrollContainer.current) {
      if (direction === 'left') {
        scrollContainer.current.scrollLeft -= 300;
      } else {
        scrollContainer.current.scrollLeft += 300;
      }
    }
  };

  useEffect(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (data && !isLoading) {
      console.log('data===>', data.items);
      setYoutube((prevYoutube) => [...prevYoutube, ...data.items]);
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩중!</div>;
  }
  if (isError) {
    return <div>오류가생겼습니다.</div>;
  }

  const StyledContainer = styled.div`
    margin-top: ${({ headerHeight }) => (headerHeight > 5 ? `${headerHeight}px` : '0')};
  `;

  return (
    <>
      {/* <Header /> */}
      {/* <StyledContainer headerHeight={headerHeight}> */}
      <Chapter>👀자취생 레시피👀</Chapter>
      <WatchMoreContainer>
        <WatchMore onClick={watchMore}>더보기</WatchMore>
      </WatchMoreContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DirectionButton onClick={() => handleScroll('left')}>
          <img src="/asset/left.png" alt="scroll left" />
        </DirectionButton>
        <VideoContainer ref={scrollContainer}>
          {yotube.map((item) => {
            return (
              <VideoItem key={item.snippet.title}>
                <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
                <div>{item.snippet.title}</div>
              </VideoItem>
            );
          })}
        </VideoContainer>
        <DirectionButton onClick={() => handleScroll('right')}>
          <img src="/asset/right.png" alt="scroll right" />
        </DirectionButton>
      </div>
      {/* </StyledContainer> */}
    </>
  );
};

export default Chapterthree;