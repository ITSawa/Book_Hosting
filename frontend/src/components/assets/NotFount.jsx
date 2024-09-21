import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <p className="error-message">
        <span>404</span> | <span>Not found</span>
      </p>
      <Link to="/" className="home-link">
        Home
      </Link>
    </div>
  );
}

export default React.memo(NotFound);