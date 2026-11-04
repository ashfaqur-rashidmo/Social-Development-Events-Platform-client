
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  HandHeart,
  Plus,
  PlusCircle,
  CalendarDays,
  Users,
  LogOut,
  LogIn,
  Menu,
  ChevronDown,
  UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, Popover } from "@heroui/react";
import { toast } from "react-toastify";
import { Sun, Moon, Check } from "lucide-react";
import { useTheme } from "next-themes";
import Loader from "../Spinner/Loader";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

const [mounted, setMounted] = useState(false);

    useEffect(() => {
      // Hydration guard: only show theme icon after mount to avoid SSR mismatch
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    }, []);

const { theme, setTheme } = useTheme();

 

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed. Please try again.");
        return;
      }

      toast.success("Logged out successfully!");
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const navLinks = [
    { name: "Upcoming Events", href: "/upcoming-events" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-950/95 dark:text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md">
            <HandHeart size={23} />
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-emerald-800">
                KindredPulse
              </h1>
              <span className="text-2xl text-orange-400">.</span>
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

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Popover>
              <Popover.Trigger>
                <button
                  type="button"
                  aria-label="Open menu"
                  title="Menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Menu size={20} />
                </button>
              </Popover.Trigger>

              <Popover.Content className="w-60" placement="bottom end">
                <Popover.Dialog>
                  <div className="flex flex-col gap-1 p-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          pathname === link.href
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                        }`}
                      >
                        <CalendarDays size={17} />
                        {link.name}
                      </Link>
                    ))}

                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <UserRound size={17} />
                          Profile
                        </Link>

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

                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut size={17} />
                          Log Out
                        </button>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <LogIn size={17} />
                        Log In
                      </Link>
                    )}
                  </div>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          </div>

          {/* Theme Selector */}
<Popover>
  <Popover.Trigger>
    <button
      type="button"
      aria-label="Change theme"
      title="Change theme"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {mounted && theme === "dark" ? (
        <Moon size={19} />
      ) : (
        <Sun size={19} />
      )}
    </button>
  </Popover.Trigger>

  <Popover.Content className="w-44" placement="bottom end">
    <Popover.Dialog>
      <div className="p-2">
        <p className="px-2 pb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Appearance
        </p>

        <button
          type="button"
          onClick={() => setTheme("light")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Sun size={17} />
          Light
          {mounted && theme === "light" && (
            <Check size={16} className="ml-auto text-emerald-600" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Moon size={17} />
          Dark
          {mounted && theme === "dark" && (
            <Check size={16} className="ml-auto text-emerald-600" />
          )}
        </button>
      </div>
    </Popover.Dialog>
  </Popover.Content>
</Popover>

         
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
             <div className="flex h-9 w-24 items-center justify-center">
              <Loader />
           </div>
          ) : user ? (
            <>
              {/* User Profile Dropdown */}
              <Popover>
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
                          {user.name?.charAt(0).toUpperCase()}
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
                       href="/profile"
                       className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
  >
                      <UserRound size={17} />
                       Profile
                      </Link>

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
              </Popover>

              <Link
                href="/create-event"
                className="hidden items-center gap-2 rounded-lg bg-emerald-700 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:flex"
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
                href="/login"
                className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:hidden"
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
