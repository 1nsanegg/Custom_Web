import { z } from "zod";
import {
  SignUpFormSchema,
  SignInFormSchema,
  FormState,
} from "@/auth/nextjs/schemas";
import { db } from "../../../firebase/clientApp";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { hashPassword } from "../core/passwordHasher";
import { redirect } from "next/navigation";

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

  const hashedPassword = await hashPassword(data.password, "salt");
  console.log(hashedPassword);
  redirect("/");
}
