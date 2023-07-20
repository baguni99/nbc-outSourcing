import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import CustomButton from './Buttons';
import { Header } from '../style/Header';
import {
  Chapter,
  SubBody,
  SubChapter,
  SubVideoAuthor,
  SubVideoContainer,
  SubVideoImage,
  SubVideoItem,
  SubVideoTitle,
  VideoInfo
} from '../style/Style';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

export const fetchVideos = async (category, pageToken = '') => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: 'AIzaSyDg5gp0Iwf3H5hmgmQG3cZ4axoUiUUs2dw',
      maxResults: 5,
      pageToken
    }
  });

  return response.data;
};

export const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const fetchVideosRef = useRef(fetchVideos);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sortType, setSortType] = useState('recent');
  const [sortVideos, setSortedVideos] = useState([]); //
  const [headerHeight, setHeaderHeight] = useState(0);
  const target = useRef();
  const navigate = useNavigate();
  const watchDetail = () => {
    navigate('/Sub2/:id');
  };

  const { isLoading, error, data } = useQuery(['videos', nextPageToken], () =>
    fetchVideosRef.current('자취생 레시피', nextPageToken)
  );

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setScrollPosition(window.pageYOffset);
        setNextPageToken(data.nextPageToken);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, { threshold: 1.0 });
  useEffect(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);
  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target.current]);
  const sortMethod = (method) => {
    let newSortedVideos;

    if (method === 'recent') {
      newSortedVideos = [...videos].sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt));
    } else if (method === 'old') {
      newSortedVideos = [...videos].sort((a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt));
    }
    setSortType(method);
    setSortedVideos(newSortedVideos);
  };
  useEffect(() => {
    if (data && !isLoading) {
      setVideos((prevVideos) => {
        const newVideos = data.items.filter((video) => !prevVideos.find((v) => v.id.videoId === video.id.videoId));
        return [...prevVideos, ...newVideos];
      });
      window.scrollTo(0, scrollPosition);
      sortMethod(sortType);
    }
  }, [data, isLoading]);

  if (isLoading) return 'Loading...';
  if (error) return `에러 발생: ${error.message}`;
  const StyledContainer = styled.div`
    margin-top: ${({ headerHeight }) => (headerHeight > 10 ? `${headerHeight}px` : '0')};
  `;

  return (
    <div>
      <Header />
      <StyledContainer headerHeight={headerHeight}>
        <SubChapter>Chapter 1 | 자 취 레 시 피</SubChapter>
        <CustomButton sortMethod={sortMethod} />
        <SubVideoContainer>
          {sortVideos.map((video) => {
            const id = video.id.videoId || video.id.channelId || video.etag;
            return (
              <SubVideoItem onClick={watchDetail} key={id}>
                <SubVideoImage src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                <VideoInfo>
                  <SubVideoTitle>{video.snippet.title}</SubVideoTitle>
                  <br />
                  <br />
                  <SubVideoAuthor>작성자: {video.snippet.channelTitle}</SubVideoAuthor>
                  <br />
                  <div>게시일 : {video.snippet.publishedAt}</div>
                </VideoInfo>
              </SubVideoItem>
            );
          })}
        </SubVideoContainer>
        <div style={{ height: '100px' }} ref={target}></div>
      </StyledContainer>
    </div>
  );
};
