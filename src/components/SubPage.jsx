import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import CustomButton from './Buttons';
import { SortByOld, SortByRecent } from './Style';

export const fetchVideos = async (category, pageToken = '') => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: 'AIzaSyCT9PXBOXxav1Jo-sMv_nl5mTOGfoeLdcE',
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
  const target = useRef(null);

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

  return (
    <div>
      <div>카테고리 제목이 들어갑니다(mainPage와 합친 후 넣을 예정)</div>
      <CustomButton sortMethod={sortMethod} />
      <ul>
        {sortVideos.map((video) => {
          const id = video.id.videoId || video.id.channelId || video.etag;
          return (
            <li key={id}>
              <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
              {video.snippet.title} <div>게시일 : {video.snippet.publishedAt}</div>
              <div>작성자: {video.snippet.channelTitle}</div>
            </li>
          );
        })}
      </ul>
      <div style={{ height: '100px' }} ref={target}>
        target
      </div>
    </div>
  );
};
