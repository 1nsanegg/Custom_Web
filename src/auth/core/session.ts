

import { z } from "zod";
import { userRoles } from "../../firebase/schemas";
import { randomBytes } from "crypto";
import { redisClient } from "@/redis/redis";
import { Cookie } from "next/font/google";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7

const COOKIE_SESSION_KEY = "session-id"

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});

type UserSession = z.infer<typeof sessionSchema>;
export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export function getUserFromSession(cookies: Pick<Cookies, "get">) {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value
    if (sessionId == null) return null
    return getUserSessionById(sessionId)
}

export async function createUserSession(user: UserSession, cookies: Cookies) {
  const sessionId = randomBytes(512).toString("hex").normalize();
  await redisClient.set(`session: ${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS
  })

  setCookie(sessionId, cookies)

}

export async function removeUserFromSession(cookies: Pick<Cookies,"get" | "delete">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value
  if (sessionId == null) return null

  await redisClient.del(`session: ${sessionId}`)
  cookies.delete(COOKIE_SESSION_KEY)
}

export function setCookie(sessionId : string, cookies: Pick<Cookies, "set">) {
    cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  })
}

async function getUserSessionById(sessionId: string) {
    const rawUser = await redisClient.get(`session: ${sessionId}`)
    const result = sessionSchema.safeParse(rawUser)

    if (!result.success) {
        return null
    }
    return result.data
}