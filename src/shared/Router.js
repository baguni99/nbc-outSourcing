import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VideoList } from '../components/SubPage';
import { fetchVideos } from '../components/SubPage';
import Main from '../pages/Main';
const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<fetchVideos />} /> */}
          <Route path="/" element={<VideoList />} />
          <Route path="main" element={<Main />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRouter;
