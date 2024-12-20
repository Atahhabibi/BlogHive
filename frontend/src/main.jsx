import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.jsx";
const CLIENT_ID =
  "730838682277-mpc4g1pige9896hot5om2921vbh6q3u7.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StyledEngineProvider>
);
