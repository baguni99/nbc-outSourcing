import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SubTwoVideoTitle, VideoSection } from '../style/Style';
const apiUrl = process.env.REACT_APP_API_VIDEO_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const VideoSec = () => {
  const [video, setVideo] = useState(null);
  const { id } = useParams();
  console.log('영상id', id);

  const fetchVideo = async () => {
    console.log(apiUrl, apiKey);
    const response = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        id,
        key: apiKey
      }
    });
    console.log('로그확인', response.data);
    setVideo(response.data.items[0]);
  };

  useEffect(() => {
    console.log('useEffect is running');
    fetchVideo();
  }, [id]);

  const opts = {
    width: '720',
    height: '480',
    playerVars: {
      autoPlay: 0
    }
  };

  return (
    <div>
      {video && (
        <>
          <SubTwoVideoTitle>{video.snippet.title}</SubTwoVideoTitle>
          <VideoSection>
            <YouTube videoId={video.id} opts={opts} />
          </VideoSection>
        </>
      )}
    </div>
  );
};

export default VideoSec;
