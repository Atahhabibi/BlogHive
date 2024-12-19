import React from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MemoryIcon from "@mui/icons-material/History";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";

const shortcuts = [
  { icon: <GroupIcon />, label: "Friends" },
  { icon: <MemoryIcon />, label: "Memories" },
  { icon: <BookmarkIcon />, label: "Saved" },
  { icon: <GroupIcon />, label: "Groups" },
  { icon: <VideoLibraryIcon />, label: "Video" },
  { icon: <StorefrontIcon />, label: "Marketplace" },
  { icon: <AssessmentIcon />, label: "Ads Manager" },
  { icon: <EventIcon />, label: "Events" }
];

const RightSidebar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 2,
        borderRadius: 2,
        color: "white"
      }}
    >
      {/* User Info */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          src="https://i.pravatar.cc/150"
          alt="User Avatar"
          sx={{ mr: 2 }}
        />
        <Typography variant="h6" className="font-bold">
          Atah Habibi
        </Typography>
      </Box>

      {/* Shortcuts */}
      <List>
        {shortcuts.map((shortcut, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: "white" }}>{shortcut.icon}</ListItemIcon>
            <ListItemText
              primary={shortcut.label}
              primaryTypographyProps={{
                style: { color: "white" }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RightSidebar;
