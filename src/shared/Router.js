import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VideoList } from '../components/SubPage';
import { fetchVideos } from '../components/SubPage';
const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<fetchVideos />} /> */}
          <Route path="/" element={<VideoList />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRouter;
