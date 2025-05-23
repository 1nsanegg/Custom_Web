"use client";
import { signIn } from "@/auth/nextjs/actions";
import { useActionState } from "react";

export default function LoginForm() {
  async function handleSignIn(prevState: any, formData : FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    return await signIn({email, password})
  }


  const [state, formAction] = useActionState(handleSignIn, undefined);
  return (
    <form action={formAction}>
      <div className="bg-blue-900 p-10 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <h3 className="text-center text-sm">
          Please enter your Email and your Password
        </h3>
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
          <p className="text-red-500 text-sm">{state.errors.password}</p>
        )}
        <div className="text-right text-sm">
          <a href="#" className="link link-hover">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
        <button className="btn btn-outline w-full">
          Or Sign in with Google
        </button>

        <p className="text-center text-sm">
          Not a member yet?
          <a href="/auth/register" className="link link-primary">
            Register
          </a>
        </p>
      </div>
    </form>
  );
}
