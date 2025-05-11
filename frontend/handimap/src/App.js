import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Login from './pages/login';
import './App.css';
import Register from './pages/register';
import Map from './pages/map';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
