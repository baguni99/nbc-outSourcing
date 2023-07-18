import { useQuery } from 'react-query';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

export const fetchVideos = async (category, pageToken = '') => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: 'AIzaSyA5LqbiURh00hMQd_nspmkQ0BMtgpmJKdw',
      maxResults: 50,
      pageToken
    }
  });

  return response.data;
};

export const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const fetchVideosRef = useRef(fetchVideos);
  const { isLoading, error, data } = useQuery(['videos', nextPageToken], () =>
    fetchVideosRef.current('자취생 레시피', nextPageToken)
  );

  const target = useRef(null);

  const options = {
    threshold: 1.0
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        setNextPageToken(data.nextPageToken); // Fetch next set of videos
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target.current]);

  useEffect(() => {
    if (data && !isLoading) {
      setVideos((prevVideos) => [...prevVideos, ...data.items]);
    }
  }, [data, isLoading]);

  if (isLoading) return 'Loading...';

  if (error) return `에러 발생: ${error.message}`;

  return (
    <div>
      <div>카테고리 제목이 들어갑니다(mainPage와 합친 후 넣을 예정)</div>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            {video.snippet.title} <div>게시일 : {video.snippet.publishedAt}</div>
            <div>작성자: {video.snippet.channelTitle}</div>
          </li>
        ))}
      </ul>
      <div style={{ height: '100px' }} ref={target}>
        target
      </div>
    </div>
  );
};
