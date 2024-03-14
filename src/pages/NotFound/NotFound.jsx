import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="d-flex align-items-center flex-column text-center">
      <h1>
        <code>404 Not Found</code>&nbsp;
      </h1>
      <p>
        This Page Is not found, go back to home screen by clicking{" "}
        <Link to="/">Here</Link>
      </p>
    </main>
  );
}

export default NotFound;
