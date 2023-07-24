import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import CustomButton from './Buttons';
import { Header } from '../style/Header';
import {
  SubChapter,
  SubVideoAuthor,
  SubVideoContainer,
  SubVideoImage,
  SubVideoItem,
  SubVideoTitle,
  VideoInfo
} from '../style/Style';
import { useNavigate } from 'react-router';
import styled from 'styled-components'; // Correct import
import { Footer } from '../style/Footer';
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchVideos = async (category, pageToken = '') => {
  const response = await axios.get(apiUrl, {
    params: {
      part: 'snippet',
      q: category,
      key: `${process.env.REACT_APP_API_KEY}`,
      maxResults: 12,
      pageToken
    }
  });

  return response.data;
};
const StyledContainer = styled.div`
  margin-top: ${(props) => props.headerMargin}px;
`;

export const VideoListThree = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const fetchVideosRef = useRef(fetchVideos);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sortType, setSortType] = useState('recent');
  const [sortVideos, setSortedVideos] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const target = useRef();
  const navigate = useNavigate();
  const watchDetail = (id) => {
    navigate(`/Sub2/${id}`);
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setScrollPosition(window.pageYOffset);
        if (data && data.nextPageToken) {
          setNextPageToken(data.nextPageToken);
        }
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isLoading, error, data } = useQuery(['videotip', nextPageToken], () =>
    fetchVideosRef.current('자취 노하우', nextPageToken)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 1.0 });

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, data]);
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

  return (
    <div>
      <Header />
      <StyledContainer headerMargin={0}>
        <SubChapter>Chapter 3 | 자 취 노 하 우</SubChapter>
        <CustomButton sortMethod={sortMethod} />

        <SubVideoContainer>
          {sortVideos.map((video) => {
            const id = video.id.videoId || video.id.channelId || video.etag;
            return (
              <SubVideoItem onClick={() => watchDetail(id)} key={id}>
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
      <Footer />
    </div>
  );
};
