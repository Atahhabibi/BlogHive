import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon } from "../components";
import { SitemarkIcon } from "../components";
import { redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../util/CustomFetch";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import FacebookLogin from "../components/FacebookLogin";
import SocialLogin from "../components/SocialLogin";
import GoogleLoginPage from "../components/GoogleLogin";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px"
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
  })
}));

const createUser = async (formData, navigate) => {
  try {
    const response = await customFetch.post("/register", formData);
    const data = response.data;
    toast.success("Accounted created successfully !");
    navigate("/login");

    return data;
  } catch (error) {
    const errorMessage = error.response.data.message || "something went wrong";
    toast.error(errorMessage);
    return error;
  }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const createUserMutation = useMutation({
    mutationFn: async (data) => createUser(data, navigate)
  });

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = Object.fromEntries(data);
    createUserMutation.mutate(data);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
        backgroundImage: `url("https://e0.pxfuel.com/wallpapers/496/954/desktop-wallpaper-solid-black.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Card variant="outlined">
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <SitemarkIcon />
        </Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Create an Account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2
          }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Username</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="userName"
              type="userName"
              name="userName"
              placeholder="your name"
              autoComplete="userName"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="your password"
              type="password"
              id="password"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="terms" color="primary" />}
            label="I agree to the Terms and Conditions"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
              <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </span>
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <GoogleLoginPage />
        </Box>
      </Card>
    </Box>
  );
};

export default RegisterPage;
