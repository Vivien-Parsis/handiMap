import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Login from './pages/login';
import './App.css';
import Register from './pages/register';
import Map from './pages/map';
import Footer from './components/footer';
import Error404 from './pages/error404';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error404/>} />
      </Routes>
      
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
