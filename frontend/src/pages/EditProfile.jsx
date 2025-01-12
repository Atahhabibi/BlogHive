import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import useEditAccountMutation from "../customHooks/useEditAccountMutation";
import useUserData from "../customHooks/useUserData";
import useDeleteAccountMutation from "../customHooks/deleteAccountMutation";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const { data } = useUserData();

  const userImage = data?.user?.image || "";


  const [userName, setUserName] = useState( data?.user?.userName || "");
  const [email, setEmail] = useState(data?.user?.email || "");
  const [password, setPassword] = useState(data?.user?.password || "");
  const [jobTitle, setJobTitle] = useState(data?.user?.jobTitle|| "");
  const [jobDescription, setJobDescription] = useState(data?.user?.jobDescription|| "");
  const [location, setLocation] = useState(data?.user?.location || "");
  const [profilePic, setProfilePic] = useState(userImage);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const[LoadingProfilePic,setLoadingProfilePic]=useState(null);

  const editAccountMutation = useEditAccountMutation();
  const deleteAccountMutation=useDeleteAccountMutation(); 



  // Handle form submission
  const handleSave = () => {
    const payload = {
      userName,
      email,
      password: password || undefined, // Only send password if provided
      jobTitle,
      jobDescription,
      location
    };

    if (profilePic) {
      payload.image = profilePic; // Add image if updated
    }

    editAccountMutation.mutate({ payload });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoadingProfilePic(URL.createObjectURL(file)); // Store the image locally
      setProfilePic(file)
    }
  };

  const handleDeleteAccount = () => {
    setOpenDeleteDialog(false);
    deleteAccountMutation.mutate(); 
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
              src={LoadingProfilePic || profilePic}
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

          {/* Name and Job Title in One Row */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
          >
            {/* Full Name */}
            <TextField
              label="Full Name"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  input: { color: "white" },
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.6)"
                  },
                  "&.Mui-focused fieldset": { borderColor: "#2196f3" }
                }
              }}
            />

            {/* Job Title */}
            <TextField
              label="Job Title"
              variant="outlined"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  input: { color: "white" },
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.6)"
                  },
                  "&.Mui-focused fieldset": { borderColor: "#2196f3" }
                }
              }}
            />
          </Box>

          {/* Job Description */}
          <TextField
            label="Job Description"
            variant="outlined"
            multiline
            rows={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
          />

          {/* Email */}
          <TextField
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
          />

          {/* Password */}
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
          />

          {/* Location */}
          <TextField
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "rgba(255, 255, 255, 0.8)" } }}
          />

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

          {/* Delete Account Button */}
          <Box display="flex" justifyContent="center">
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              color="error"
              sx={{
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "#FF4D4F",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  borderColor: "#D9363E",
                  backgroundColor: "rgba(255, 0, 0, 0.1)"
                },
                width: "100%"
              }}
              onClick={() => setOpenDeleteDialog(true)}
            >
              Delete Account
            </Button>
          </Box>
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
