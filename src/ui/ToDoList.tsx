"use client";

import React from "react";
import { Check, Pencil, Trash2, ClipboardList, Plus } from "lucide-react";
import {
  addTodoItem,
  DeleteTodoItem,
  getAllToDos,
  markTodoDone,
} from "@/auth/nextjs/actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { id } from "zod/v4/locales";
import { useActionState } from "react";
import TodoCard, { TodoCardProps } from "@/ui/TodoCard";

const ToDoList = () => {
  const [todos, setTodos] = useState<TodoCardProps[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Not Started");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getAllToDos(); // this should return an array
      setTodos(data);
    };

    fetchTodos();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo = {
      title,
      description,
      priority,
      status,
      image: "", // or provide a default image URL
      createdOn: new Date().toISOString(),
    };

    try {
      const createdId = await  (newTodo); // your function
      setTodos((prev) => [...prev, { ...newTodo, id: createdId }]);

      // Close modal and reset form
      (document.getElementById("my_modal_5") as HTMLDialogElement)?.close();
      setTitle("");
      setDescription("");
      setPriority("Low");
      setStatus("Not Started");
    } catch (err) {
      console.error("❌ Failed to add todo:", err);
    }
  };
  return (
    <div className="flex flex-col items-center mt-5 text-5xl border-1 rounded-2xl p-4">
      <div className="relative w-full mb-10">
        <div className="absolute top-2 left-2 flex items-center">
          <ClipboardList className="w-6 h-6" />
          <h1 className="text-sm">To-Do</h1>
        </div>
        <button
          className="btn"
          onClick={() =>
            (
              document.getElementById("my_modal_5") as HTMLDialogElement
            )?.showModal()
          }
        >
          Add New Task
        </button>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Todo</h3>

            <form
              method="dialog"
              onSubmit={handleSubmit}
              className="space-y-4 mt-4"
            >
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Priority</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <form method="dialog">
                  <button className="btn">Cancel</button>
                </form>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      {todos.map((todo, index) => (
        <TodoCard
          key={index}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          image={todo.image}
          priority={todo.priority}
          status={todo.status}
          createdOn={todo.createdOn}
        />
      ))}

      {/* {message && (
        <div
          className={`alert shadow-lg mb-4 w-full max-w-xl text-sm ${
            message.startsWith("✅") ? "alert-success" : "alert-error"
          }`}
        >
          {message}
        </div>
      )}
      <ul className="list bg-base-100 rounded-box shadow-md space-y-2 w-full max-w-xl min-h-[100px] flex flex-col justify-center items-center">
        {todos.length === 0 ? (
          <li className="text-center text-sm text-gray-400">No items yet</li>
        ) : (
          todos.map((todo, index) => (
            <li
              key={todo.id}
              className="list-row flex items-center justify-between space-x-4 w-full"
            >
              <div className="text-2xl font-thin opacity-30 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="flex-1">
                <div
                  className={`text-base font-medium ${
                    todo.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.name}
                </div>
                <div
                  className={`text-xs uppercase font-semibold opacity-60 ${
                    todo.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.description}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!todo.done && (
                  <button
                    className="btn btn-ghost btn-xs"
                    title="Mark as done"
                    onClick={() => handleMarkAsDone(todo.id)}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                <button
                  className="btn btn-ghost btn-xs"
                  title="Edit"
                  onClick={() => router.push(`/todos/edit/${todo.id}`)}
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  className="btn btn-ghost btn-xs"
                  title="Remove"
                  onClick={() => handleDelete(todo.id)}
                  disabled={deletingId === todo.id}
                >
                  {deletingId === todo.id ? (
                    <span className="loading loading-spinner w-4 h-4 text-red-500"></span>
                  ) : (
                    <Trash2 className="w-4 h-4 text-red-500" />
                  )}
                </button>
              </div>
            </li>
          ))
        )}
      </ul> */}

      <div className="flex flex-col items-center mt-40">
        <a href="/todos/add">
          <button className="btn btn-neutral btn-sm ml-4">Add new</button>
        </a>
      </div>
    </div>
  );
};

export default ToDoList;
