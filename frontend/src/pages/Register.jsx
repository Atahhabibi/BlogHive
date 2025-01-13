import * as React from "react";
import {
  Box,
  Button,
  Card as MuiCard,
  Checkbox,
  Divider,
  FormLabel,
  FormControl,
  FormControlLabel,
  Link,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { SitemarkIcon } from "../components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GoogleLoginPage from "../components/GoogleLogin";
import { customFetch } from "../util/CustomFetch";

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
  }
}));

const createUser = async (formData, navigate) => {
  try {
    const response = await customFetch.post(
      "/register",
      Object.fromEntries(formData)
    );
    toast.success("Account created successfully!");

    const token = response.data.token;

    localStorage.setItem("authToken", token);
    navigate("/login");
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
    throw error;
  }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [userNameError, setUserNameError] = React.useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = React.useState("");

  const createUserMutation = useMutation({
    mutationFn: async (data) => createUser(data, navigate)
  });

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const userName = document.getElementById("userName");

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

    if (
      !userName.value ||
      userName.value.length < 3 ||
      /[^a-zA-Z0-9]/.test(userName.value)
    ) {
      setUserNameError(true);
      setUserNameErrorMessage(
        "Username must be at least 3 characters long and contain only letters and numbers."
      );
      isValid = false;
    } else {
      setUserNameError(false);
      setUserNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("its me");

    if (!validateInputs()) {
      return;
    }

    let data = new FormData(event.currentTarget);
    createUserMutation.mutate(data);
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
      <Card>
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
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Username Input */}
          <FormControl>
            <FormLabel htmlFor="userName">Username</FormLabel>
            <TextField
              error={userNameError}
              helperText={userNameErrorMessage}
              id="userName"
              name="userName"
              placeholder="Your username"
              autoComplete="username"
              required
              fullWidth
            />
          </FormControl>

          {/* Email Input */}
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              fullWidth
            />
          </FormControl>

          {/* Password Input */}
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              required
              fullWidth
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="terms" color="primary" />}
            label="I agree to the Terms and Conditions"
          />
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Box>
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          Already have an account?{" "}
          <Link href="/login" variant="body2">
            Sign in
          </Link>
        </Typography>
        <Divider sx={{ my: 2 }}>or</Divider>
        <GoogleLoginPage />
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default RegisterPage;
