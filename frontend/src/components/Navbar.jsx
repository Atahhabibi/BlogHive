import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useUserData from "../customHooks/useUserData";

const pages = ["home", "About", "Categories", "Search"];
const loggedInPages = [
  "About",
  "Categories",
  "Search",
  "Create Post",
  "Profile",
];
const settings = [
  "Profile",
  "About",
  "Notifications",
  "Categories",
  "CreatePost",
];

function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true); // State to control navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Last scroll position
  const { data } = useUserData();
  const user = data?.user || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logout Successfully");
    setIsLoggedIn(false);
    setTimeout(() => navigate("/"), 100);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting) {
      navigate(`/${setting.toLowerCase()}`);
    }
  };

  // Scroll event listener for larger screens
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only apply scrolling functionality for larger screens (min-width: 960px)
      if (window.innerWidth >= 960) {
        if (currentScrollY > lastScrollY) {
          setShowNavbar(false); // Hide navbar when scrolling down
        } else {
          setShowNavbar(true); // Show navbar when scrolling up
        }
      }

      setLastScrollY(currentScrollY); // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        transform: { md: showNavbar ? "translateY(0)" : "translateY(-100%)" },
        transition: "transform 0.3s ease-in-out",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Menu Icon */}
          <IconButton
            size="large"
            aria-label="toggle navigation menu"
            color="inherit"
            onClick={handleOpenNavMenu}
            sx={{ display: { xs: "flex", md: "flex" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* App Name */}
          <Typography
            variant={isLoggedIn ? "h6" : "subtitle1"}
            noWrap
            component={Link}
            to={isLoggedIn ? "/notifications" : "/"}
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "1rem", // Smaller font size for logged-out users
            }}
          >
            BlogPillar
          </Typography>

          {/* Navigation Menu for Mobile */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {(isLoggedIn ? loggedInPages : pages).map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to={`/${page.toLowerCase().replace(/\s+/g, "")}`}
                  textAlign="center"
                  sx={{ textDecoration: "none", color: "inherit" }}
                  className="text-xs lg:text-lg text-center m-auto "
                >
                  {page}
                </Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Profile and Logout or Login/Register */}
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleLogout}
                sx={{ ml: 2, color: "white", textTransform: "none",fontSize:"0.8rem" }}
              >
                Logout
              </Button>
              <Tooltip title={user?.userName}  >
                <IconButton onClick={() => navigate("/profile")} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.userName || "User"}
                    src={user?.image || ""}
                    className="w-8 h-8 md:w-10 md:h-10"
                  />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "0.875rem", // Smaller font size for Register
                  mr: 1,
                }}
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "0.875rem", // Smaller font size for Login
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
