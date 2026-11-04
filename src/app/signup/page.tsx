"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

   const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

   const name = (formData.get("name") as string).trim();
   const email = (formData.get("email") as string).trim();
    const image = formData.get("photoUrl") as string;
    const password = formData.get("password") as string;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
        setError(
            "Password must contain at least 6 characters, one uppercase letter, and one lowercase letter."
        );
        setLoading(false);
        return;
    }

    try {
        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            image: image || undefined,
        });

        if (error) {
            setError(error.message || "Registration failed");
            toast.error(error.message || "Registration failed");
            return;
        }

        toast.success("Registration successful!");

        router.push("/");
        router.refresh();

    } catch {
        setError("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");

    } finally {
        setLoading(false);
    }
};

    const handleGoogleSignup = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-10 bg-[#faf9ff]">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 text-center">
                    Create your account
                </h2>

                <p className="mt-2 text-sm text-gray-600 text-center">
                    Join the civic action network.
                </p>

                <form onSubmit={handleSignup} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
                            Photo URL
                        </label>

                        <input
                            id="photoUrl"
                            type="url"
                            name="photoUrl"
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
    id="password"
    type="password"
    name="password"
    required
    minLength={6}
    placeholder="Enter your password"
    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
/>
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-800 disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition duration-200 hover:bg-gray-50"
                    >
                        Continue with Google
                    </button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-600">
                    Already registered?{" "}
                    <Link href="/login" className="text-teal-700 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignUpPage;