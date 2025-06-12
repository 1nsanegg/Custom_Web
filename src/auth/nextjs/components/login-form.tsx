"use client";
import { signIn } from "@/auth/nextjs/actions";
import { useActionState } from "react";
import { User, Lock, FacebookIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function LoginForm() {
  async function handleSignIn(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    return await signIn({ email, password });
  }

  const [state, formAction] = useActionState(handleSignIn, undefined);
  return (
    <form
      action={formAction}
      className="bg-white p-8 md:p-12 lg:p-16 w-full max-w-5xl mx-auto my-20 rounded-[10px] flex flex-col lg:flex-row gap-10"
    >
      {/* Left side: Form */}
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Sign In</h1>

        <div className="relative mb-5">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 z-10" />
          <input
            type="text"
            name="email"
            placeholder="Enter Username"
            className="input input-bordered border-black rounded-[8px] w-full input-secondary bg-white pl-10 relative z-0"
          />
        </div>

        <div className="relative mb-5">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 z-10" />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className="input input-bordered border-black rounded-[8px] w-full input-secondary bg-white pl-10 relative z-0"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
        </div>

        <label className="label mb-[25px]">
          <input type="checkbox" defaultChecked className="checkbox" />
          Remember me
        </label>

        <div>
          <button type="submit" className="btn btn-primary bg-geraldine-300 w-32">
            Login
          </button>
        </div>

        {/* Social Login */}
        <div className="mt-10 flex items-center gap-x-3 flex-wrap">
          <p className="text-[16px] font-medium font-montserrat pr-2">
            Or, Login with
          </p>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-[32px] h-[32px] text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-[32px] h-[32px] text-white bg-red-600 rounded hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-[32px] h-[32px] text-white bg-black rounded hover:bg-gray-800"
          >
            <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
          </a>
        </div>

        <div className="pt-4">
          <p>
            Don’t have an account?{" "}
            <a href="" className="text-blue-700 font-semibold underline">
              Create one
            </a>
          </p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src="/login_image.png"
          alt="Login Illustration"
          className="w-full max-w-sm h-auto object-contain"
        />
      </div>
    </form>
  );
}
