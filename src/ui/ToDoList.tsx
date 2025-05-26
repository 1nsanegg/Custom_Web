"use client";

import React from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import {
  DeleteTodoItem,
  getAllToDos,
  markTodoDone,
} from "@/auth/nextjs/actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { id } from "zod/v4/locales";
import { useActionState } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getAllToDos();
      console.log(data);
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const res = await DeleteTodoItem(id);

    if (res.error) {
      setMessage(` ${res.message}`);
    } else {
      setMessage(` ${res.message}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    setDeletingId(null);

    // Optional: Clear the message after a few seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleMarkAsDone = async (id: string) => {
    const res = await markTodoDone(id);
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: true } : todo))
    );

    setMessage(`${res.message}`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="flex flex-col items-center mt-20 text-5xl">
      <h1 className="text-3xl mb-6">To-Do List</h1>
      {message && (
        <div
          className={`alert shadow-lg mb-4 w-full max-w-xl text-sm ${
            message.startsWith("✅") ? "alert-success" : "alert-error"
          }`}
        >
          {message}
        </div>
      )}
      <ul className="list bg-base-100 rounded-box shadow-md p-4 space-y-2 w-full max-w-xl min-h-[100px] flex flex-col justify-center items-center">
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
      </ul>

      <div className="flex flex-col items-center mt-40">
        <a href="/todos/add">
          <button className="btn btn-neutral btn-sm ml-4">Add new</button>
        </a>
      </div>
    </div>
  );
};

export default ToDoList;
