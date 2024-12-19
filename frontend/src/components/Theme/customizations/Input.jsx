import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { gray, brand } from "../themePrimitives";

const InputsTheme = ({ children }) => {
  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true
        },
        styleOverrides: {
          root: (theme) => ({
            boxSizing: "border-box",
            transition: "all 100ms ease-in",
            "&:focus-visible": {
              outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
              outlineOffset: "2px"
            }
          })
        }
      },
      MuiButton: {
        styleOverrides: {
          root: (theme) => ({
            boxShadow: "none",
            borderRadius: (theme.vars || theme).shape.borderRadius,
            textTransform: "none",
            variants: [
              {
                props: {
                  size: "small"
                },
                style: {
                  height: "2.25rem",
                  padding: "8px 12px"
                }
              },
              {
                props: {
                  size: "medium"
                },
                style: {
                  height: "2.5rem"
                }
              }
            ]
          })
        }
      },
      MuiCheckbox: {
        defaultProps: {
          disableRipple: true,
          icon: (
            <CheckBoxOutlineBlankRoundedIcon
              sx={{ color: "hsla(210, 0%, 0%, 0.0)" }}
            />
          ),
          checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
          indeterminateIcon: (
            <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />
          )
        },
        styleOverrides: {
          root: (theme) => ({
            margin: 10,
            height: 16,
            width: 16,
            borderRadius: 5,
            border: "1px solid ",
            borderColor: alpha(gray[300], 0.8),
            boxShadow: "0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset",
            backgroundColor: alpha(gray[100], 0.4),
            transition: "border-color, background-color, 120ms ease-in",
            "&:hover": {
              borderColor: brand[300]
            },
            "&.Mui-focusVisible": {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: "2px",
              borderColor: brand[400]
            },
            "&.Mui-checked": {
              color: "white",
              backgroundColor: brand[500],
              borderColor: brand[500],
              boxShadow: `none`,
              "&:hover": {
                backgroundColor: brand[600]
              }
            }
          })
        }
      }
    }
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default InputsTheme;
