import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { VideoList } from '../components/chapter/SubPage';

import Main from '../pages/Main';
import Sub2 from '../pages/Sub2';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

import { VideoListThree } from '../components/chapter/SubPageThree';
import { VideoListTwo } from '../components/chapter/SubPagetwo';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false
      // refetchOnWindowFocus: false
    }
  }
});

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/VideoList" element={<VideoList />} />
          <Route path="/VideoListTwo" element={<VideoListTwo />} />
          <Route path="/VideoListThree" element={<VideoListThree />} />
          <Route path="/Sub2/:id" element={<Sub2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRouter;
