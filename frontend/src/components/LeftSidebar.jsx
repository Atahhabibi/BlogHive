import React from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PostAddIcon from "@mui/icons-material/PostAdd";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";


const tempUser= {
  recommendedUsers: [
    {
      _id: "1",
      userName: "tech_guru",
      bio: "Tech Enthusiast",
      image: "https://i.pravatar.cc/150?img=5"
    },
    {
      _id: "2",
      userName: "wanderlust",
      bio: "Travel Blogger",
      image: "https://i.pravatar.cc/150?img=8"
    }
  ]
};


const LeftSidebar = ({ user }) => {
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
          src={user?.image}
          alt={user?.userName || "User Avatar"}
          sx={{ mr: 2 }}
        />
        <Box>
          <Typography variant="h6" className="font-bold">
            {user?.userName || "Anonymous"}
          </Typography>
          <Typography variant="body2" style={{ color: "gray" }}>
            {user?.jobTitle || "Unspecified Job Title"}
          </Typography>
        </Box>
      </Box>

      {/* User Stats */}
      <Box mb={4}>
        <Typography variant="h6" className="font-bold mb-2">
          Profile Details
        </Typography>
        <List>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText
              primary="Job Description"
              secondary={user?.jobDescription || "Not specified"}
             
            />
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText
              primary="Location"
              secondary={user?.location || "Not specified"}
            
            />
          </ListItem>
        </List>
      </Box>

      {/* User Activity */}
      <Box mb={4}>
        <Typography variant="h6" className="font-bold mb-2">
          Your Activity
        </Typography>
        <List>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText
              primary="Total Posts"
              secondary={user?.CalcNums?.totalPosts || 0}
             
            />
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText
              primary="Saved Posts"
              secondary={user?.CalcNums?.totalBookmarks || 0}
           
            />
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary="Followers"
              secondary={user?.followers?.length || 0}
             
            />
          </ListItem>
        </List>
      </Box>

      <Divider className="my-4" />

      {/* Follow Suggestions */}
      <Typography variant="h6" className="font-bold mb-2">
        Recommended Users
      </Typography>
      <List>
        {tempUser?.recommendedUsers?.length > 0 ? (
         tempUser.recommendedUsers.map((recommendedUser) => (
            <ListItem key={recommendedUser._id}>
              <Avatar
                src={recommendedUser.image || "https://i.pravatar.cc/150"}
                alt={recommendedUser.userName || "User Avatar"}
                sx={{ mr: 2 }}
              />
              <ListItemText
                primary={`@${recommendedUser.userName || "Anonymous"}`}
                secondary={recommendedUser.bio || "No bio available"}
                primaryTypographyProps={{ style: { color: "white" } }}
                secondaryTypographyProps={{ style: { color: "gray" } }}
              />
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="small"
                onClick={() => handleFollow(recommendedUser._id)}
              >
                Follow
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography
            variant="body2"
            style={{ color: "gray", textAlign: "center", marginTop: "10px" }}
          >
            No recommended users available.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default LeftSidebar;
