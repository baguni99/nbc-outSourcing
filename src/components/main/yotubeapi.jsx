import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export const fetchVideos = async (category, pageToken = '') => {
  const respones = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: 'AIzaSyA0bHsrm90pIK2J9anLy_b2LTg8wbsJWck',
      maxResults: 5,
      pageToken
    }
  });
  console.log(respones);

  return respones.data;
};

export const Yotubeapi = () => {
  const { isLoading, isError, data } = useQuery('youtube', fetchVideos);
  const [yotube, setYoutube] = useState([]);

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

  return (
    <>
      <div>
        {yotube.map((item) => {
          return (
            <div key={item.id.videoId}>
              <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
              <div>{item.snippet.title}</div>
              <div>게시일 : {item.snippet.publishedAt}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Yotubeapi;
