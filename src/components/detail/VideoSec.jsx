import React from "react";
import { styled } from "styled-components";

const VideoSec = () => {
  return <VideoSection>동영상섹션</VideoSection>;
};

export default VideoSec;

const VideoSection = styled.div`
  width: 720px;
  height: 480px;
  margin: 100px auto;
  background-color: #999;
`;
