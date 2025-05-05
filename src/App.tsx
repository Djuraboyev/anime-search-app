import { Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import DetailPage from './DetailPage';
import './App.css';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
