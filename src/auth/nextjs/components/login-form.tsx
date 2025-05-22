'use client';
import { login } from '@/app/auth/login/actions';
import { useActionState } from "react";


export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined)
  return (
    <form action={loginAction}>
      <div className="bg-blue-900 p-10 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <h3 className="text-center text-sm">
          Please enter your Username and your Password
        </h3>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered border-white rounded-2xl w-full input-secondary bg-blue-900"
        />

        <div className="text-right text-sm">
          <a href="#" className="link link-hover">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="btn btn-primary w-full">Login</button>
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
