
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from "@mui/material/styles";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>
);
