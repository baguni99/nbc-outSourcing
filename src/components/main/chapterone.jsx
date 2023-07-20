import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import CustomButton from '../chapter/Buttons';
import { WatchMore } from '../style/Style';
import { useNavigate } from 'react-router';

export const fetchVideos = async (category, pageToken = '') => {
  const respones = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: 'AIzaSyBiulx16gBOFnn-mNQcmV8Eihn_SQS-_J4',
      maxResults: 1,
      pageToken
    }
  });
  console.log(respones);

  return respones.data;
};

export const Chapterone = () => {
  const [yotube, setYoutube] = useState([]);
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery('youtube', () => fetchVideos('자취생 레시피'));
  const watchMore = () => {
    navigate('/VideoList');
  };
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
      <WatchMore onClick={watchMore}>더보기</WatchMore>
    </>
  );
};

export default Chapterone;