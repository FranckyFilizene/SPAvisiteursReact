import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // 1. On récupère la clé
  const isAuth = localStorage.getItem("auth");
  const location = useLocation();

  // 2. Si pas connecté, on redirige vers "/" 
  // On utilise "replace" pour éviter que l'utilisateur puisse revenir en arrière avec le bouton "Précédent"
  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace/>;
  }

  // 3. Si connecté, on affiche le contenu
  return children;
};

export default ProtectedRoute;