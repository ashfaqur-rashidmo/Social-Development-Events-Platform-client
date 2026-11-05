
import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
            <div className="w-full max-w-lg text-center">

                {/* Icon */}
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <SearchX size={38} strokeWidth={1.6} />
                </div>

                {/* Error Code */}
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                    Error 404
                </p>

                {/* Heading */}
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                    Page not found
                </h1>

                {/* Description */}
                <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
                    Sorry, we couldn't find the page you're looking for.
                    It may have been moved, deleted, or the URL might be incorrect.
                </p>

                {/* Home Button */}
                <div className="mt-9">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                        <Home size={17} />
                        Back to Home
                    </Link>
                </div>

                {/* Footer */}
                <p className="mt-12 text-sm text-slate-400 dark:text-slate-500">
                    If you believe this is an error, please check the URL and try again.
                </p>

            </div>
        </main>
    );
}
