import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
header {

  font-family: 'Jua', sans-serif;
  background-color: rgb(205, 217, 199)

}
body {
    background-color:#f2f2f2
    
   
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
  background-color: rgb(217, 201, 186);
  color: rgb(131, 131, 131);
  border-radius: 25px;
  border-color: transparent;
  margin-bottom: 30px;
  &:hover {
    background-color: #593f2f;
    color: #f2f2f2;
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
  margin: 1px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 300px;
  margin-right: 30px;
  border-width: 30px;
  border-color: 2px solid lightgray;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 300px;
  margin-bottom: 20px;
  border: 2px solid lightgray;
  img {
    width: 100%;
    height: 200px;
  }
`;
export const SubVideoImage = styled.img`
  width: 500px;
  height: 300px;
  margin-bottom: 50px;
`;
export const VideoInfo = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const SubVideoContainer = styled.ul`
  border-color: black;
  border-type: solid;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 3%;
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
export const VideoTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 20px;
`;
export const VideoThumbnail = styled.img``;

export const StyledBody = styled.div`
  padding-top: ${({ headerHeight }) => (headerHeight > 10 ? `${headerHeight}px` : '0')};
`;
export const VideoBox = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬 */
  justify-content: center; /* 가로 정렬 */
  border: 2px solid lightgray;
  padding: 40px;
  margin-bottom: 10px;
  margin-right: 10px;
`;
export const VideoSection = styled.div`
  width: 720px;
  height: 480px;
  margin: 100px auto;
  background-color: #999;
  margin-top: 30px;
`;
export const SubTwoVideoTitle = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 22px;
  border-radius: 30px;
  font-weight: bold;
  color: rgb(52, 73, 94);
  justify-content: center;
`;
