"use client";
import { signUp } from "@/auth/nextjs/actions";
import { useActionState } from "react";

export default function RegisterForm() {
  async function handleFormSubmit(prevState: any, formData: FormData) {
    const data = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    return await signUp(data);
  }

  const [state, formAction, pending] = useActionState(
    handleFormSubmit,
    undefined
  );

  return (
    <form action={formAction}>
      <div className="p-10 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <h3 className="text-center text-sm w-max">
          Please enter your Name, Login and your Password
        </h3>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        {state?.errors?.username && (
          <p className="text-red-500 text-sm">{state.errors.username[0]}</p>
        )}
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        {state?.errors?.password && (
          <div>
            <p className="text-red-500 text-sm">Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li className="text-red-500 text-sm" key={error}>
                  - {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <input
          type="password"
          placeholder="Re-enter Password"
          name="confirmPassword"
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        {state?.errors?.confirmPassword &&
          (() => {
            const errors = state.errors.confirmPassword;
            const mismatchError = errors.find(
              (e) => e === "Passwords do not match"
            );
            return (
              <p className="text-red-500 text-sm">
                {mismatchError ?? errors[0]}
              </p>
            );
          })()}
        <div className="text-right text-sm">
          <a href="#" className="link link-hover">
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="btn btn-outline w-full"
        >
          {pending ? "Submitting..." : "Sign up"}
        </button>

        <p className="text-center text-sm">
          Already have account?
          <a href="/auth/login" className="link link-primary">
            Login
          </a>
        </p>
      </div>
    </form>
  );
}
