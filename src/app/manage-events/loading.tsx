import Loader from "@/components/Spinner/Loader";

const Loading = () => {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl">

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                    Manage My Events
                </h1>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    Update or remove the events you&apos;ve created.
                </p>

                <div className="flex justify-center py-20">
                    <Loader />
                </div>

            </div>
        </main>
    );
};

export default Loading;