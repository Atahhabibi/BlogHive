import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import  inputsCustomizations  from "./customizations/Input";
import dataDisplayCustomizations from "./customizations/DataDisplay";
import feedbackCustomizations from './customizations/Feedback'
import surfacesCustomizations from "./customizations/Surface";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";
import navigationCustomizations from "./customizations/Navigation";

const AppTheme = ({
  children,
  disableCustomTheme = false,
  themeComponents
}) => {
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template"
          },
          colorSchemes,
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents
          }
        });
  }, [disableCustomTheme, themeComponents]);

  if (disableCustomTheme) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
