"use client";

import { addTodoItem } from "@/auth/nextjs/actions";
import { AddItemFormState } from "@/auth/nextjs/schemas";
import React, { useActionState, useState } from "react";

const AddToDoItemForm = () => {
  async function handleFormSubmit(
    prevState: AddItemFormState,
    formData: FormData
  ) {
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };

    return await addTodoItem(data);
  }
  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    undefined
  );
  return (
    <form action={formAction}>
      <div className="bg-blue-900 p-10 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">New ToDo Item</h1>
        <h3 className="text-center text-sm">
          Please enter Todo item name and its description
        </h3>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-xs">{state.errors.name.join(", ")}</p>
        )}
        <input
          type="text"
          placeholder="Description"
          name="description"
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        {state?.errors?.description && (
          <p className="text-red-500 text-xs">
            {state.errors.description.join(", ")}
          </p>
        )}
        {state?.message && (
          <p className="text-center text-xs text-yellow-300">{state.message}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-xs"></span>
              Creating...
            </span>
          ) : (
            "Create"
          )}
        </button>

        <a href="/todos" className="btn btn-neutral w-full">
          Go back
        </a>
      </div>
    </form>
  );
};

export default AddToDoItemForm;
