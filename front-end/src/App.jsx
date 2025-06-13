import { Routes, Route, useLocation } from "react-router";
import ProtectedRoute from "./components/protectedRoute";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import ProtectedOwnerRoute from "./components/protectedOwnerRoute";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Maps from "./pages/map/map";
import Error404 from "./pages/error/error404";
import Account from "./pages/account/account";
import AccountAvis from "./pages/account/accountAvis";
import OwnerEtablissement from "./pages/owner/ownerEtablissement";
import OwnerAddEtablissement from "./pages/owner/ownerAddEtablissement";
import OwnerModifyEtablissement from "./pages/owner/ownerModifyEtablissement";
import OwnerEtablissementAvis from "./pages/owner/ownerEtablissementAvis";
import Etablissement from "./pages/etablissement/etablissement";
import EtablissementAvisNew from "./pages/etablissement/etablissementAvisNew";
import MentionsLegales from "./pages/mentionsLegales";

function App() {
  const location = useLocation();
  const showHeader = () => {
    return location.pathname.startsWith("/map") ||
      location.pathname.startsWith("/etablissement") ||
      location.pathname === "/" ? (
      ""
    ) : (
      <Header />
    );
  };
  return (
    <>
      {showHeader()}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Maps />} />
        <Route path="/etablissement" element={<Etablissement />} />
        <Route path="/MentionsLegales" element={<MentionsLegales />} />
        <Route
          path="/etablissement/avis/new"
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
