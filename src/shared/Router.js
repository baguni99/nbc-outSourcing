import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VideoList } from '../components/chapter/SubPage';

import Main from '../pages/Main';
import Sub2 from '../pages/Sub2';
import Chapterone from '../components/main/Chapterone';
const queryClient = new QueryClient(); // QueryClient 인스턴스 생성

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/VideoList" element={<VideoList />} />
          <Route path="/Sub2/:id" element={<Sub2 />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRouter;
