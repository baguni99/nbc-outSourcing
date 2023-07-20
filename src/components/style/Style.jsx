import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
header {

  font-family: 'Jua', sans-serif;
    
}
body {

    background-color:#f0f1d5;
}`;

export default GlobalStyle;

export const MultiUseButton = styled.button``;
export const SortByOld = styled(MultiUseButton)`
  background-color: transparent;
  border-color: transparent;
  color: rgb(127, 127, 127);
  font-size: 18px;
  &:hover {
    color: rgb(64, 64, 64);
  }
`;
export const SortByRecent = styled(MultiUseButton)`
  background-color: transparent;
  border-color: transparent;
  color: rgb(127, 127, 127);
  font-size: 18px;
  &:hover {
    color: rgb(64, 64, 64);
  }
`;

export const WatchMore = styled(MultiUseButton)`
  width: 64px;
  height: 28px;
  background-color: rgb(230, 230, 230);
  color: rgb(131, 131, 131);
  border-radius: 25px;
  border-color: transparent;
  &:hover {
    background-color: rgb(158, 158, 158);
    color: rgb(255, 255, 255);
  }
`;
export const WatchMoreContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const GoToTop = styled(MultiUseButton)`
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: transparent;
  border-color: transparent;
`;

export const Chapter = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  background-color: rgba(26, 188, 156, 0.44);
  height: 45px;
  width: 205px;
  font-size: 22px;
  border-radius: 30px;
  font-weight: bold;
  color: rgb(52, 73, 94);
`;
export const SubChapter = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 22px;
  border-radius: 30px;
  font-weight: bold;
  color: rgb(52, 73, 94);
`;
export const VideoContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
`;

export const VideoItem = styled.div`
  flex: 0 0 auto;
  width: 300px;
  margin-right: 30px;
  border-width: 30px;
  border-color: lightgray;
  img {
    width: 100%;
    height: 200px;
  }
`;

export const DirectionButton = styled.button`
  background-color: transparent;
  border-color: transparent;
`;

export const SubVideoItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid lightgray;
  padding: 10px;
  margin-bottom: 10px;
`;
export const SubVideoImage = styled.img`
  width: 500px;
  height: 300px;
  margin-bottom: 50px;
`;
export const VideoInfo = styled.div`
  margin-left: 20px;
`;

export const SubVideoContainer = styled.ul`
  border-color: black;
  border-type: solid;
`;
export const SubVideoTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const SubVideoAuthor = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
export const SubVideoDate = styled.div`
  font-size: 16px;
`;
