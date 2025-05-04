import { Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import DetailPage from './DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/anime/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
