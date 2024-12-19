import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(
    "Full Stack Developer | Tech Enthusiast | Blogger"
  );
  const [location, setLocation] = useState("San Francisco, CA");
  const [profilePic, setProfilePic] = useState(
    "https://i.pravatar.cc/150?img=7"
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  const handleProfilePicChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleDeleteAccount = () => {
    setOpenDeleteDialog(false);
    alert("Account deleted successfully.");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 py-8">
      <Container maxWidth="sm">
        {/* Back Button */}
        <Box display="flex" alignItems="center" mb={4} mt={4}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: "#1E88E5",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              ":hover": { backgroundColor: "#1565C0" }
            }}
          >
            Back to Profile
          </Button>
        </Box>

        {/* Page Title */}
        <Typography
          variant="h4"
          className="font-bold text-white mb-4 text-center"
        >
          Edit Profile
        </Typography>

        {/* Edit Profile Form */}
        <Box
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          display="flex"
          flexDirection="column"
          gap={3}
        >
          {/* Avatar Section */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={profilePic}
              alt="Profile Avatar"
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<PhotoCamera />}
              component="label"
              sx={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                ":hover": { borderColor: "rgba(255, 255, 255, 0.6)" }
              }}
            >
              Change Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleProfilePicChange}
              />
            </Button>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />

          {/* Full Name */}
          <TextField
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                input: { color: "white" },
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.6)" },
                "&.Mui-focused fieldset": { borderColor: "#2196f3" }
              }
            }}
          />

          {/* Email Field */}
          <TextField
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                input: { color: "white" },
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.6)" },
                "&.Mui-focused fieldset": { borderColor: "#2196f3" }
              }
            }}
          />

          {/* Change Password */}
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                input: { color: "white" },
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.6)" },
                "&.Mui-focused fieldset": { borderColor: "#2196f3" }
              }
            }}
          />

          {/* Bio Field */}
          <TextField
            label="Bio"
            variant="outlined"
            multiline
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                input: { color: "white" },
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.6)" },
                "&.Mui-focused fieldset": { borderColor: "#2196f3" }
              }
            }}
          />

          {/* Location Field */}
          <TextField
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
          />

          <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />

          {/* Save Button */}
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            fullWidth
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Save Changes
          </Button>
        </Box>
      </Container>

      {/* Delete Account Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfilePage;
