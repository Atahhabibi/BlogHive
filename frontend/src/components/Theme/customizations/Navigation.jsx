import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { alpha } from "@mui/material/styles";
import { gray, brand } from "../themePrimitives";

const NavigationTheme = ({ children }) => {
  const theme = createTheme({
    components: {
      MuiMenuItem: {
        styleOverrides: {
          root: (theme) => ({
            borderRadius: (theme.vars || theme).shape.borderRadius,
            padding: "6px 8px",
            "&.Mui-focusVisible": {
              backgroundColor: "transparent"
            },
            "&.Mui-selected": {
              "&.Mui-focusVisible": {
                backgroundColor: alpha(theme.palette.action.selected, 0.3)
              }
            }
          })
        }
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            gap: "0px"
          },
          paper: (theme) => ({
            marginTop: "4px",
            borderRadius: (theme.vars || theme).shape.borderRadius,
            border: `1px solid ${(theme.vars || theme).palette.divider}`,
            backgroundImage: "none",
            background: "hsl(0, 0%, 100%)",
            boxShadow:
              "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
            "& .Mui-selected": {
              backgroundColor: alpha(theme.palette.action.selected, 0.3)
            },
            ...theme.applyStyles("dark", {
              background: gray[900],
              boxShadow:
                "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px"
            })
          })
        }
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: React.forwardRef((props, ref) => (
            <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
          ))
        },
        styleOverrides: {
          root: (theme) => ({
            borderRadius: (theme.vars || theme).shape.borderRadius,
            border: "1px solid",
            borderColor: gray[200],
            backgroundColor: (theme.vars || theme).palette.background.paper,
            boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
            "&:hover": {
              borderColor: gray[300]
            },
            "&.Mui-focused": {
              borderColor: gray[400]
            },
            ...theme.applyStyles("dark", {
              borderColor: gray[700],
              boxShadow: `inset 0 1px 0 1px ${alpha(
                gray[700],
                0.15
              )}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
              "&:hover": {
                borderColor: alpha(gray[700], 0.7)
              },
              "&.Mui-focused": {
                borderColor: gray[900]
              }
            })
          })
        }
      },
      MuiLink: {
        defaultProps: {
          underline: "none"
        },
        styleOverrides: {
          root: (theme) => ({
            color: (theme.vars || theme).palette.text.primary,
            fontWeight: 500,
            position: "relative",
            textDecoration: "none",
            width: "fit-content",
            "&::before": {
              content: '""',
              position: "absolute",
              width: "100%",
              height: "1px",
              bottom: 0,
              left: 0,
              backgroundColor: (theme.vars || theme).palette.text.secondary,
              opacity: 0.3,
              transition: "width 0.3s ease, opacity 0.3s ease"
            },
            "&:hover::before": {
              width: 0
            },
            "&:focus-visible": {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: "4px"
            }
          })
        }
      }
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default NavigationTheme;
