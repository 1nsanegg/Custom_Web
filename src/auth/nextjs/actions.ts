'use server';

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
import { createUserSession } from "@/auth/core/session";
import { cookies } from "next/headers";
import { id } from "zod/v4/locales";
import { UserRole } from "@/firebase/schemas";

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
    })


    const user : {id: string, role: UserRole} = {
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
export async function signIn(unsafeData: z.infer<typeof SignInFormSchema>) {}
