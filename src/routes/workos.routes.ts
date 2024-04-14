import express from "express";
import { workos } from "../workOSsetup.js";
import { config } from "../config.js";
import { sealData } from "iron-session";
import { withAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// AuthKit routes
router.get("/auth", (req, res) => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    // Specify that we'd like AuthKit to handle the authentication flow
    provider: "authkit",

    // The callback endpoint that WorkOS will redirect to after a user authenticates
    redirectUri: "http://localhost:3000/callback",
    clientId: config.workosClientId, // Ensure clientId is defined
  });

  // Redirect the user to the AuthKit sign-in page
  res.redirect(authorizationUrl);
});

// Callback route
router.get("/callback", async (req, res) => {
  // The authorization code returned by AuthKit
  const code = req.query.code as string;
  const { user, accessToken, refreshToken, impersonator } =
    await workos.userManagement.authenticateWithCode({
      code,
      clientId: config.workosClientId,
    });

  // The refreshToken should never be accesible publicly,
  // hence why we encrypt it in the cookie session.
  // Alternatively you could persist the refresh token in a backend database
  const encryptedSession = await sealData(
    { accessToken, refreshToken, user, impersonator },
    { password: config.workosCookiePassword },
  );

  // Store the session in a cookie
  res.cookie("wos-session", encryptedSession, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  // Use the information in `user` for further business logic.
  // Redirect the user to the homepage
  res.redirect("/");
});

export default router;
