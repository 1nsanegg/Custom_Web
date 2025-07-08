"use client";

import React, { useActionState, useEffect, useState } from "react";
import { updateTodoItem, getToDoById } from "@/auth/nextjs/actions";
import { AddItemFormState } from "@/auth/nextjs/schemas";
import { useParams } from "next/navigation";

const EditToDoListForm = () => {
  const { id } = useParams<{ id: string }>();
  const [formValues, setFormValues] = useState({ name: "", description: "" });

  useEffect(() => {
    async function fetchTodo() {
      const data = await getToDoById(id);
      if (data) {
        setFormValues({ name: data.title, description: data.description });
      }
    }
    fetchTodo();
  }, [id]);

  async function handleFormSubmit(
    prevState: AddItemFormState,
    formData: FormData
  ) {
    const data = {
      id: id as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    };
    return await updateTodoItem(data);
  }

  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    undefined
  );

  return (
    <form action={formAction}>
      <div className="bg-blue-900 p-10 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Edit ToDo Item</h1>
        <h3 className="text-center text-sm">
          You can update this item’s name and description
        </h3>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        {state?.errors?.name && (
          <p className="text-red-400 text-sm">{state.errors.name.join(", ")}</p>
        )}

        <input
          type="text"
          placeholder="Description"
          name="description"
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        {state?.errors?.description && (
          <p className="text-red-400 text-sm">
            {state.errors.description.join(", ")}
          </p>
        )}
        {state?.message && (
          <p className="text-green-300 text-center text-sm">{state.message}</p>
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
            "Update"
          )}
        </button>

        <a href="/todos" className="btn btn-neutral w-full">
          Go back
        </a>
      </div>
    </form>
  );
};

export default EditToDoListForm;
