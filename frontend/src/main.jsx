import React from "react";
import ReactDOM from "react-dom/client";


import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);


// warped by auth provider (have auth context )- it is provided to entire application 
// no matter in any route / component we get info about the auth(userId or token)