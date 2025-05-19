import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Login from './pages/login';
import './App.css';
import Register from './pages/register';
import Maps from './pages/map';
import Footer from './components/footer';
import Error404 from './pages/error404';
import Account from './pages/account';
import AccountAvis from './pages/accountAvis';
import ProtectedOwnerRoute from './components/protectedOwnerRoute';
import OwnerEtablissement from './pages/ownerEtablissement';
import OwnerAddEtablissement from './pages/ownerAddEtablissement';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Maps />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/avis"
          element={
            <ProtectedRoute>
              <AccountAvis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/etablissement"
          element={
            <ProtectedOwnerRoute>
              <OwnerEtablissement />
            </ProtectedOwnerRoute>

          }
        />
        <Route
          path="/account/etablissement/add"
          element={
            <ProtectedOwnerRoute>
              <OwnerAddEtablissement />
            </ProtectedOwnerRoute>

          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
