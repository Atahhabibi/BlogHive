import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const TopNavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#0a1929", // Dark blue background
        backdropFilter: "blur(10px)",
        marginTop: "4rem"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Navigation Icons on the Left */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton sx={{ color: "white" }} onClick={() => navigate("/")}>
            <HomeIcon />
          </IconButton>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => navigate("/notifications")}
          >
            <NotificationsIcon />
          </IconButton>
        </Box>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", mx: 2 }}>
          <TextField
            placeholder="Search..."
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              input: { color: "white" },
              width: "100%",
              borderRadius: 1
            }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon sx={{ color: "white" }} />
                </IconButton>
              )
            }}
          />
        </Box>

        {/* Profile Avatar on the Right */}
        <Avatar
          src="https://i.pravatar.cc/150"
          alt="Profile"
          sx={{ cursor: "pointer" }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
