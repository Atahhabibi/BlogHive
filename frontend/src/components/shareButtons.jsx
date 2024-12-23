import React from "react";
import { IconButton, Box } from "@mui/material";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from "react-share";

const ShareButtons = ({ url, title }) => {
  return (
    <Box display="flex" gap={2}>
      {/* Facebook */}
      <FacebookShareButton url={url} quote={title}>
        <IconButton>
          <FacebookIcon size={32} round />
        </IconButton>
      </FacebookShareButton>

      {/* Twitter */}
      <TwitterShareButton url={url} title={title}>
        <IconButton>
          <TwitterIcon size={32} round />
        </IconButton>
      </TwitterShareButton>

      {/* LinkedIn */}
      <LinkedinShareButton url={url} title={title}>
        <IconButton>
          <LinkedinIcon size={32} round />
        </IconButton>
      </LinkedinShareButton>

      {/* WhatsApp */}
      <WhatsappShareButton url={url} title={title}>
        <IconButton>
          <WhatsappIcon size={32} round />
        </IconButton>
      </WhatsappShareButton>
    </Box>
  );
};

export default ShareButtons;
