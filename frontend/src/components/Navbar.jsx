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
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import { toast } from "react-toastify";
import useUserData from "../util/useUserData";

const pages = ["About", "Categories", "Search"];
const loggedInPages = [
  "About",
  "Categories",
  "Search",
  "Create Post",
  "Profile"
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];


function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true); // State to control navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State to track last scroll position

  const { data, isLoading, error } = useUserData();
  const user = data?.user || {};


  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logout Successfully");
    setIsLoggedIn("")
    setTimeout(() => navigate("/"), 100); // Navigate after 100ms
  };

  const navigationPages = isLoggedIn ? loggedInPages : pages;

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
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
    <>
      {/* Navbar with conditional visibility */}
      <AppBar
        position="fixed"
        sx={{
          transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: "none"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Icon and App Name */}
            <MessageIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={isLoggedIn? "/notifications" : "/"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              BlogHive
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {navigationPages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Button
                      component={Link}
                      to={`/${page.toLowerCase().replace(/\s+/g, "")}`}
                      sx={{ textAlign: "center" }}
                    >
                      {page}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* App Name for Mobile */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              BlogHive
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {navigationPages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase().replace(/\s+/g, "")}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* User Menu with Login and Register */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 2
              }}
            >
              {/* Register and Login Buttons */}
              {!isLoggedIn ? (
                <>
                  <Button
                    component={Link}
                    to="/register"
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Register
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{ color: "white", textTransform: "none" }}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <Button
                  component={Link}
                  onClick={handleLogout}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    display: { xs: "none", md: "block" }
                  }}
                >
                  Logout
                </Button>
              )}

              {/* Profile Icon */}

              {isLoggedIn ? (
                <>
                  <Box
                    sx={{
                      display: { md: "block", xs: "none" } // Show only on small screens
                    }}
                  >
                    <Tooltip title={"Atah habibi"}>
                      <IconButton
                        sx={{ p: 0 }}
                        onClick={() => navigate("/profile")}
                      >
                        <Avatar
                          alt={user?.userName || "User"}
                          src={
                            user?.image ||
                            ""
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Box
                    sx={{
                      display: { xs: "block", md: "none" } // Show only on small screens
                    }}
                  >
                    <Tooltip title={"Atah habibi"}>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={user?.name || "User"}
                          src={
                            user?.avatar ||
                            "https://avatars.githubusercontent.com/u/106895247?v=4"
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ) : null}

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* To prevent content overlap with fixed navbar */}
      <Box sx={{ mt: 5 }} /> {/* Add top margin to push content below navbar */}
    </>
  );
}

export default ResponsiveAppBar;
