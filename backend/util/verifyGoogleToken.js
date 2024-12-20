const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "730838682277-mpc4g1pige9896hot5om2921vbh6q3u7.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID 
    });
    const payload = ticket.getPayload(); 
    console.log("Decoded Payload:", payload);

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      googleId: payload.sub
    };
  } catch (error) {
    console.error("Error verifying Google token:", error);
    throw new Error("Invalid Google token.");
  }
};

module.exports = verifyGoogleToken;
