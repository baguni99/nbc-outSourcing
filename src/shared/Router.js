import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubPage from '../components/SubPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
