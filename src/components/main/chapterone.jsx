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

export const fetchVideos = async (category, pageToken = '') => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: `${process.env.REACT_APP_API_KEY}`,
      maxResults: 5,
      pageToken
    }
  });
  console.log(response);

  return response.data;
};

export const Chapterone = () => {
  const [yotube, setYoutube] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery('youtube', () => fetchVideos('자취생 레시피'));
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
  }, [data, isLoading]);

  if (isLoading) {
    return <div>로</div>;
  }
  if (isError) {
    return <div>오</div>;
  }

  return (
    <div style={{ marginLeft: '40px', marginRight: '40px' }}>
      <Chapter>📌자취생 레시피</Chapter>
      <WatchMoreContainer>
        <WatchMore onClick={watchMore}>더보기</WatchMore>
      </WatchMoreContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1px' }}>
        <DirectionButton onClick={() => handleScroll('left')}>
          <img src="/asset/left.png" alt="scroll left" />
        </DirectionButton>
        <VideoContainer ref={scrollContainer}>
          {yotube.map((item) => {
            return (
              <VideoBox key={item.id.videoId || item.etag}>
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

export default Chapterone;
