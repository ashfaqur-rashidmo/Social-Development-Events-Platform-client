
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  HandHeart,
  Moon,
  Sun,
  Plus,
  PlusCircle,
  CalendarDays,
  Users,
  LogOut,
  ChevronDown,
} from "lucide-react";

// import { authClient } from "@/lib/auth-client";
// import { Avatar, Popover } from "@heroui/react";
// import { toast } from "react-toastify";
// import { useTheme } from "next-themes";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

//   const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   const handleSignOut = async () => {
//     try {
//       const { error } = await authClient.signOut();

//       if (error) {
//         toast.error(error.message || "Logout failed. Please try again.");
//         return;
//       }

//       toast.success("Logged out successfully!");
//       router.replace("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

  const navLinks = [
    { name: "Upcoming Events", href: "/upcoming-events" },
    { name: "How It Works", href: "/how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-8xl items-center justify-between px-4 md:px-5">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md">
            <HandHeart size={23} />
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-bold tracking-tight text-emerald-800">
                KindredPulse
              </h1>
              <span className="text-xl text-orange-400">.</span>
            </div>

            <p className="text-[10px] font-semibold tracking-wider text-gray-700">
              CIVIC ACTION NETWORK
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden h-full items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex h-full items-center border-b-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-teal-700 text-teal-700"
                    : "border-transparent text-gray-700 hover:border-teal-700 hover:text-teal-700"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              mounted
                ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
                : "Toggle theme"
            }
            title={
              mounted
                ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
                : "Toggle theme"
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
          >
            {mounted && theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
          >
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-white bg-red-500" />
          </button>

          {/* Authentication */}
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
          ) : user ? (
            <>
              {/* User Profile Dropdown */}
              {/* <Popover>
                <Popover.Trigger>
                  <button
                    type="button"
                    aria-label="Open user profile"
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2.5 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <Avatar size="sm">
                      <Avatar.Image
                        src={user.image || undefined}
                        alt={user.name || "User"}
                      />
                      <Avatar.Fallback>
                        {user.name?.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>

                    <span className="hidden max-w-24 truncate text-sm font-semibold text-slate-700 sm:block">
                      {user.name}
                    </span>

                    <ChevronDown
                      size={15}
                      className="hidden text-slate-400 sm:block"
                    />
                  </button>
                </Popover.Trigger>

                <Popover.Content className="w-70" placement="bottom end">
                  <Popover.Dialog>
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <Avatar size="lg">
                        <Avatar.Image
                          src={user.image || undefined}
                          alt={user.name || "User"}
                        />
                        <Avatar.Fallback>
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </Avatar.Fallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 py-3">
                      <Link
                        href="/create-event"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <PlusCircle size={17} />
                        Create Event
                      </Link>

                      <Link
                        href="/manage-events"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <CalendarDays size={17} />
                        Manage Events
                      </Link>

                      <Link
                        href="/joined-events"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Users size={17} />
                        Joined Events
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={17} />
                        Log Out
                      </button>
                    </div>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover> */}

              <Link
                href="/create-event"
                className="hidden items-center gap-2 rounded-lg bg-emerald-800 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-900 sm:flex"
              >
                <Plus size={17} />
                Create Event
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-emerald-700"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="hidden rounded-lg border border-emerald-700 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:block"
              >
                Sign Up
              </Link>

              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-lg bg-emerald-800 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-900 sm:hidden"
              >
                <Plus size={15} />
                Join
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
