import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Chapter,
  DirectionButton,
  VideoBox,
  VideoContainer,
  VideoItem,
  VideoTitle,
  WatchMore,
  WatchMoreContainer
} from '../style/Style';
import { useNavigate } from 'react-router';

export const fetchVideosThree = async (category, pageToken = '') => {
  const respones = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: `${process.env.REACT_APP_API_KEY}`,
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
        scrollContainer.current.scrollLeft += 300;
      } else {
        scrollContainer.current.scrollLeft -= 300;
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
    return <div>중</div>;
  }
  if (isError) {
    return <div>발생</div>;
  }

  return (
    <div style={{ marginTop: '80px', marginBottom: '80px', marginLeft: '40px', marginRight: '40px' }}>
      <Chapter>📌자취 노하우</Chapter>
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
              <VideoBox key={item.snippet.title}>
                <VideoItem>
                  <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
                  <VideoTitle>{item.snippet.title}</VideoTitle>
                </VideoItem>
              </VideoBox>
            );
          })}
        </VideoContainer>
        <DirectionButton onClick={() => handleScroll('right')}>
          <img src="/asset/right.png" alt="scroll right" />
        </DirectionButton>
      </div>
    </div>
  );
};

export default Chapterthree;
