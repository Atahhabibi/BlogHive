import { createTheme, alpha } from '@mui/material/styles';

const defaultTheme = createTheme();

const customShadows = [...defaultTheme.shadows];


export const shadows = customShadows; // Add this export
export const shape = {
  borderRadius: 8 // Example: Customize as needed
};


export const brand = {
  50: 'hsl(210, 100%, 95%)',
  100: 'hsl(210, 100%, 92%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

export const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 18%)',
  800: 'hsl(0, 95%, 12%)',
  900: 'hsl(0, 93%, 6%)',
};

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const getDesignTokens = (mode) => {
  customShadows[1] =
    mode === 'dark'
      ? 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px'
      : 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px';

  return {
    palette: {
      mode,
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50]
      },
      grey: {
        ...gray
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800]
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800]
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800]
      },
      divider: mode === "dark" ? alpha(gray[700], 0.6) : alpha(gray[300], 0.4),
      background: {
        default: mode === "dark" ? gray[900] : "hsl(0, 0%, 99%)",
        paper: mode === "dark" ? "hsl(220, 30%, 7%)" : "hsl(220, 35%, 97%)"
      },
      text: {
        primary: mode === "dark" ? "hsl(0, 0%, 100%)" : gray[800],
        secondary: mode === "dark" ? gray[400] : gray[600]
      },
      action: {
        hover: mode === "dark" ? alpha(gray[600], 0.2) : alpha(gray[200], 0.2)
      }
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif", // Updated font family
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(14)
      }
    },
    shadows: customShadows
  };
};

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
      },
      grey: {
        ...gray,
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: 'hsl(0, 0%, 99%)',
        paper: 'hsl(220, 35%, 97%)',
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
      },
      action: {
        hover: alpha(gray[200], 0.2),
      },
    },
  },
  dark: {
    palette: {
      primary: {
        light: brand[300],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
      },
      grey: {
        ...gray,
      },
      success: {
        light: green[400],
        main: green[500],
        dark: green[700],
      },
      error: {
        light: red[400],
        main: red[500],
        dark: red[700],
      },
      warning: {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      },
      divider: alpha(gray[700], 0.6),
      background: {
        default: gray[900],
        paper: 'hsl(220, 30%, 7%)',
      },
      text: {
        primary: 'hsl(0, 0%, 100%)',
        secondary: gray[400],
      },
      action: {
        hover: alpha(gray[600], 0.2),
      },
    },
  },
};

export const typography = {
  fontFamily: "Roboto, Arial, sans-serif", // Updated font family
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14)
  }
};


export const theme = (mode) => createTheme(getDesignTokens(mode));