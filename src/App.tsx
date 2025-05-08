import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white font-sans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
