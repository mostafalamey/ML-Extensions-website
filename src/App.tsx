import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MLKitchens from './pages/MLKitchens';
import MLDoors from './pages/MLDoors';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ml-kitchens" element={<MLKitchens />} />
      <Route path="/ml-doors" element={<MLDoors />} />
    </Routes>
  );
}

export default App;
