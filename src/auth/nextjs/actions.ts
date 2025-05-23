"use server";

import { z } from "zod";
import {
  SignUpFormSchema,
  SignInFormSchema,
  FormState,
} from "@/auth/nextjs/schemas";
import { db } from "../../firebase/clientApp";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { generateSalt, hashPassword } from "../core/passwordHasher";
import { redirect } from "next/navigation";
import { email } from "zod/v4";
import { createUserSession, removeUserFromSession } from "@/auth/core/session";
import { cookies } from "next/headers";
import { id } from "zod/v4/locales";
import { UserRole } from "@/firebase/schemas";
import { comparePasswords } from "../core/passwordHasher";

export async function signUp(
  unsafeData: z.infer<typeof SignUpFormSchema>
): Promise<FormState> {
  const { success, data, error } = SignUpFormSchema.safeParse(unsafeData);

  if (!success) {
    const formatted = error.format();
    return {
      errors: {
        username: formatted.username?._errors,
        email: formatted.email?._errors,
        password: formatted.password?._errors,
        confirmPassword: formatted.confirmPassword?._errors,
      },
      message: "Invalid form input",
    };
  }

  const userRef = collection(db, "user");
  const q = query(userRef, where("username", "==", data.username));
  const existingUser = await getDocs(q);

  if (!existingUser.empty) {
    return {
      errors: {
        username: ["Account already exists for this username"],
      },
      message: "Account creation failed",
    };
  }

  try {
    const salt = await generateSalt();

    const hashedPassword = await hashPassword(data.password, salt);
    const docRef = await addDoc(userRef, {
      email: data.email,
      username: data.username,
      password: hashedPassword,
      salt,
      role: "user",
    });

    const user: { id: string; role: UserRole } = {
      id: docRef.id,
      role: "user",
    };
    await createUserSession(user, await cookies());
  } catch {
    return {
      errors: {
        username: ["Something went wrong. Please try again."],
      },
      message: "Account creation failed",
    };
  }

  redirect("/");
}
export async function signIn(
  unsafeData: z.infer<typeof SignInFormSchema>
): Promise<FormState> {
  const { success, data, error } = SignInFormSchema.safeParse(unsafeData);

  if (!success) {
    const formatted = error.format();
    return {
      errors: {
        email: formatted.email?._errors,
        password: formatted.password?._errors,
      },
      message: "Invalid login input.",
    };
  }

  const userRef = collection(db, "user");
  const q = query(userRef, where("email", "==", data.email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return {
      errors: {
        email: ["No account found for this email."],
      },
      message: "Login failed",
    };
  }

  const userDoc = snapshot.docs[0];
  const user = userDoc.data();

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });
  if (!isCorrectPassword) {
    return {
      errors: {
        password: ["Incorrect password."],
      },
      message: "Login failed",
    };
  }

  const userForCreateSession: { id: string; role: UserRole } = {
      id: userDoc.id,
      role: "user",
    };
  await createUserSession(userForCreateSession, await cookies())
  redirect("/");
}
export async function logOut() {
  await removeUserFromSession(await cookies())
  redirect("/signin")
}