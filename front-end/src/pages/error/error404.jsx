import React from "react";
import { Link } from "react-router";

const Error404 = () => {
  return (
    <div className="backgroundBluredColNoPadding">
      <h1>404 - Page non trouvée</h1>
      <Link to="/">Revenir sur la page principale</Link>
    </div>
  );
};

export default Error404;
