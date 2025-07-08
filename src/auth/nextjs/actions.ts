"use server";

import { z } from "zod";
import {
  SignUpFormSchema,
  SignInFormSchema,
  FormState,
  AddItemFormState,
  addToDoItemSchema,
} from "@/auth/nextjs/schemas";
import { db } from "../../firebase/clientApp";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { generateSalt, hashPassword } from "../core/passwordHasher";
import { redirect } from "next/navigation";
import { email } from "zod/v4";
import { createUserSession, removeUserFromSession } from "@/auth/core/session";
import { cookies } from "next/headers";
import { id } from "zod/v4/locales";
import { UserRole } from "@/firebase/schemas";
import { comparePasswords } from "../core/passwordHasher";
import AddToDoItemForm from "@/ui/AddToDoItemForm";
import { error } from "console";
import { TodoCardProps } from "@/ui/TodoCard";

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
  await createUserSession(userForCreateSession, await cookies());
  redirect("/dashboard");
}
export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/signin");
}

export async function getAllToDos() {
  try {
    const todoRef = collection(db, "todo");
    const snapshot = await getDocs(todoRef);

    const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return todos;
  } catch (error) {
    console.error("Error getting all todos:", error);
    return [];
  }
}

export async function addTodoItem(
  unsafeData: z.infer<typeof addToDoItemSchema>
): Promise<AddItemFormState> {
  const result = addToDoItemSchema.safeParse(unsafeData);

  if (!result.success) {
    const formatted = result.error.format();
    return {
      errors: {
        name: formatted.name?._errors,
        description: formatted.description?._errors,
      },
      message: "Invalid input.",
    };
  }

  const { name, description } = result.data;

  const itemRef = collection(db, "todo");
  const q = query(itemRef, where("name", "==", name));
  const existingItem = await getDocs(q);
  if (!existingItem.empty) {
    return {
      errors: {
        name: ["This item already exists"],
      },
      message: "Items creation failed",
    };
  }

  try {
    const docRef = doc(collection(db, "todo"));
    await setDoc(docRef, {
      id: docRef.id,
      name,
      description,
      createdAt: new Date().toISOString(),
      done: false,
    });

    console.log("Todo added with ID:", docRef.id);
    return {
      message: "Todo item added successfully!",
    };
  } catch (err) {
    console.error("Error adding todo:", err);
    return {
      message: "Failed to add todo item.",
    };
  }
}
export async function getToDoById(id: string): Promise<TodoCardProps | null> {
  if (!id) {
    console.warn("⚠️ getToDoById called with undefined id");
    return null;
  }
  const docRef = doc(db, "todo", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as TodoCardProps;
}

export async function updateTodoItem(
  unsafeData: z.infer<typeof addToDoItemSchema> & { id: string }
): Promise<AddItemFormState> {
  const { id, ...rest } = unsafeData;
  const { success, data, error } = addToDoItemSchema.safeParse(rest);
  if (!success) {
    const formatted = error.format();
    return {
      errors: {
        name: formatted.name?._errors,
        description: formatted.description?._errors,
      },
      message: "Invalid form input",
    };
  }
  const itemRef = doc(db, "todo", id);

  try {
    await setDoc(itemRef, {
      id: id,
      name: data.name,
      description: data.description,
      updatedAt: new Date().toISOString(),
    });

    return { message: "Updated successfully!" };
  } catch (err) {
    console.error("Update failed:", err);
    return { message: "Update failed." };
  }
}

export async function updateTodoField(
  id: string,
  updates: Partial<{ priority: string; status: string }>
) {
  const itemRef = doc(db, "todo", id);
  try {
    await updateDoc(itemRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    console.log("Todo updated successfully");
  } catch (err) {
    console.error("Failed to update todo:", err);
    throw err;
  }
}

export async function markTodoDone(id: string) {
  const itemRef = doc(db, "todo", id);
  await updateDoc(itemRef, {
    done: true,
    updatedAt: new Date().toISOString(),
  });
  return { message: "Marked as done!" };
}

export async function DeleteTodoItem(id: string) {
  const itemRef = doc(db, "todo", id);

  try {
    await deleteDoc(itemRef);
    return { message: "Deleted successfully!" };
  } catch (error) {
    console.error("Delete failed:", error);
    return {
      message: "Delete failed.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
