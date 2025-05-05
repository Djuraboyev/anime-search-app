import { Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import DetailPage from './DetailPage';
import HomePage from './HomePage';
import './App.css';

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
