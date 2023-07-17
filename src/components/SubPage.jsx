import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL =
  'https://www.googleapis.com/youtube/v3/search?part=snippet&q=%EC%9E%90%EC%B7%A8%EC%83%9D%20%EB%A0%88%EC%8B%9C%ED%94%BC&key=AIzaSyA5LqbiURh00hMQd_nspmkQ0BMtgpmJKdw';
const API_KEY = 'AIzaSyA5LqbiURh00hMQd_nspmkQ0BMtgpmJKdw';

const SubPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchCategoryVideos('자취생 레시피');
  }, []);

  const fetchCategoryVideos = async (category) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          part: 'snippet',
          q: category,
          key: API_KEY
        }
      });

      const videos = response.data.items;
      setVideos(videos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>자취방에서 살아남기</h1>
      <h2>자취생 레시피</h2>
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          <h3>{video.snippet.title}</h3>
          <p>{video.snippet.publishedAt}</p>
          <p>{video.snippet.channelTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default SubPage;
