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
import { styled } from 'styled-components';
import { Footer } from '../style/Footer';
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchVideos = async (category, pageToken = '') => {
  const response = await axios.get(apiUrl, {
    params: {
      part: 'snippet',
      q: category,
      key: `${process.env.REACT_APP_API_KEY}`,
      maxResults: 15,
      pageToken
    }
  });

  return response.data;
};
const StyledContainer = styled.div`
  margin-top: ${(props) => props.headerMargin}px;
`;

export const VideoListTwo = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const fetchVideosRef = useRef(fetchVideos);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sortType, setSortType] = useState('recent');
  // const [sortVideos, setSortedVideos] = useState([]); //
  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [sortedVideos, setSortedVideos] = useState([]);
  const target = useRef();
  const navigate = useNavigate();
  const watchDetail = (id) => {
    navigate(`/Sub2/${id}`);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isLoading, error, data } = useQuery(['videos', nextPageToken], () =>
    fetchVideosRef.current('자취방 구하기', nextPageToken)
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

  useEffect(() => {
    const headerElement = document.querySelector('header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setNextPageToken(data.nextPageToken);
        }
      },
      { threshold: 1 }
    );
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [data]);
  const sortVideos = (videos, method) => {
    let sortedVideos;

    if (method === 'recent') {
      sortedVideos = [...videos].sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt));
    } else if (method === 'old') {
      sortedVideos = [...videos].sort((a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt));
    }

    return sortedVideos;
  };

  const sortMethod = (method) => {
    const newSortedVideos = sortVideos(videos, method);
    setSortType(method);
    setSortedVideos(newSortedVideos);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setVideos((prevVideos) => {
        const newVideos = data.items.filter((video) => !prevVideos.find((v) => v.id.videoId === video.id.videoId));
        return [...prevVideos, ...newVideos];
      });
      sortMethod(sortType);
    }
  }, [data, isLoading]);

  if (isLoading) return 'Loading...';
  if (error) return `에러 발생: ${error.message}`;

  return (
    <div>
      <Header />
      <StyledContainer headerMargin={0}>
        <SubChapter>Chapter 2 | 자 취 방 구 하 기</SubChapter>
        <CustomButton sortMethod={sortMethod} />

        <SubVideoContainer>
          {sortedVideos.map((video) => {
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
