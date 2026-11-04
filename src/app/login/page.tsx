"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";

const LogInPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
    const { error } = await authClient.signIn.email({
        email,
        password,
    });

    if (error) {
        setError(error.message || "Login failed");
        toast.error(error.message || "Login failed");
        return;
    }

    toast.success("Login successful!");

    router.push("/");
    router.refresh();

} catch (err) {
    setError("Something went wrong. Please try again.");
    toast.error("Something went wrong. Please try again.");
    console.error(err);

} finally {
    setLoading(false);
}
    }

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-10 bg-[#faf9ff]">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 text-center">
                    Log in to your account
                </h2>

                <p className="mt-2 text-sm text-gray-600 text-center">
                    Welcome back to the civic action network.
                </p>

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>

                       <input
    id="password"
    type="password"
    name="password"
    required
    minLength={6}
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
                        {loading ? "Logging in..." : "Log in"}
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition duration-200 hover:bg-gray-50"
                    >
                        Continue with Google
                    </button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-600">
                    Not registered?{" "}
                    <Link href="/signup" className="text-teal-700 hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </main>
    );
};


export default LogInPage;