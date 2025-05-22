import { Routes, Route, useLocation } from 'react-router';
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
import Header from './components/header';
import OwnerModifyEtablissement from './pages/ownerModifyEtablissement';
import Etablissement from './pages/etablissement';
import EtablissementAvisNew from './pages/etablissementAvisNew';
import OwnerEtablissementAvis from './pages/ownerEtablissementAvis';

function App() {
  const location = useLocation()
  const showHeader = () => {
    return (location.pathname.startsWith("/map") || location.pathname.startsWith("/etablissement") || location.pathname === "/") ? "" : <Header />
  }
  return (
    <>
      {showHeader()}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Maps />} />
        <Route path="/etablissement" element={<Etablissement />} />
        <Route path="/etablissement/avis/new"
          element={
            <ProtectedRoute>
              <EtablissementAvisNew />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/account/etablissement/modify"
          element={
            <ProtectedOwnerRoute>
              <OwnerModifyEtablissement />
            </ProtectedOwnerRoute>
          }
        />
        <Route
          path="/account/etablissement/avis"
          element={
            <ProtectedOwnerRoute>
              <OwnerEtablissementAvis />
            </ProtectedOwnerRoute>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
