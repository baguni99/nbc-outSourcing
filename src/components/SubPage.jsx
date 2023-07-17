import { useQuery } from 'react-query';
import axios from 'axios';

export const fetchVideos = async (category) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: category,
      key: 'AIzaSyA5LqbiURh00hMQd_nspmkQ0BMtgpmJKdw',
      maxResults: 50
    }
  });

  return response.data.items;
};

export const VideoList = () => {
  const { isLoading, error, data } = useQuery('videos', () => fetchVideos('자취생 레시피'));

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <ul>
      {data.map((video) => (
        <li key={video.id.videoId}>
          <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          {video.snippet.title} <div>게시일 : {video.snippet.publishedAt}</div>
          <div>작성자: {video.snippet.channelTitle}</div>
        </li>
      ))}
    </ul>
  );
};
