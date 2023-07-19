import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VideoList } from '../components/SubPage';
import Yotubeapi from '../components/main/Yotubeapi';

import Main from '../pages/Main';
const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="main" element={<Main />} />
          <Route path="/" element={<Yotubeapi />} />
          <Route path="/VideoList" element={<VideoList />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRouter;
