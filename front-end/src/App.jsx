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
import PageTitle from "./components/pageTitle";

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
        <Route path="/login" element={
          <>
            <PageTitle title="Handi'Map - Se connecter"/>
            <Login />
          </>} />
        <Route path="/register" element={
          <>
            <PageTitle title="Handi'Map - S'inscrire"/>
            <Register />
          </>} />
        <Route path="/" element={<Maps />} />
        <Route path="/etablissement" element={<Etablissement />} />
        <Route path="/MentionsLegales" element={
          <>
            <PageTitle title="Handi'Map - Mentions légales"/>
            <MentionsLegales />
          </>} />
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
              <PageTitle title="Handi'Map - Mon compte"/>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/avis"
          element={
            <ProtectedRoute>
              <PageTitle title="Handi'Map - Mes avis"/>
              <AccountAvis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/etablissement"
          element={
            <ProtectedOwnerRoute>
              <PageTitle title="Handi'Map - Mes etablissements"/>
              <OwnerEtablissement />
            </ProtectedOwnerRoute>
          }
        />
        <Route
          path="/account/etablissement/add"
          element={
            <ProtectedOwnerRoute>
              <PageTitle title="Handi'Map - Ajouter un etablissement"/>
              <OwnerAddEtablissement />
            </ProtectedOwnerRoute>
          }
        />
        <Route
          path="/account/etablissement/modify"
          element={
            <ProtectedOwnerRoute>
              <PageTitle title="Handi'Map - Modifier un etablissement"/>
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
        <Route path="*" element={
          <>
            <PageTitle title="Handi'Map - Erreur 404"/>
            <Error404 />
          </>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
