import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import { JWKS, workos } from "./../workOSsetup.js";
import { unsealData, sealData } from "iron-session";
import { config } from "../config.js";
import { AccessToken, RefreshToken, User, Impersonator } from "../types.js";

interface Session {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
  user: User;
  impersonator?: Impersonator;
}

// Updated function to use the modular structure
async function withAuth(req: Request, res: Response, next: NextFunction) {
  // Attempt to get the session from the cookie
  const session = await getSessionFromCookie(req.cookies);

  if (!session) {
    return res.redirect("/login");
  }

  const hasValidSession = await verifyAccessToken(
    (session as Session).accessToken,
  );

  if (hasValidSession) {
    return next();
  }

  try {
    // Refresh token logic
    const { accessToken, refreshToken } =
      await workos.userManagement.authenticateWithRefreshToken({
        clientId: config.workosClientId,
        refreshToken: (session as Session).refreshToken,
      });

    // Encrypt the new session data
    const encryptedSession = await sealData(
      {
        accessToken,
        refreshToken,
        user: (session as Session).user,
        impersonator: (session as Session).impersonator,
      },
      { password: config.workosCookiePassword },
    );

    // Update the cookie
    res.cookie("wos-session", encryptedSession, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return next();
  } catch (e) {
    res.clearCookie("wos-session");
    res.redirect("/login");
  }
}

async function getSessionFromCookie(cookies: Record<string, string>) {
  const cookie = cookies["wos-session"];

  if (cookie) {
    return unsealData(cookie, {
      password: config.workosCookiePassword,
    });
  }
}

async function verifyAccessToken(accessToken: string) {
  try {
    await jwtVerify(accessToken, JWKS);
    return true;
  } catch (e) {
    console.warn("Failed to verify session:", e);
    return false;
  }
}

export { withAuth };
