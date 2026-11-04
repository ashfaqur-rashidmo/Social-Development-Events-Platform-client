
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  Pencil,
  ArrowRight,
  HandHeart,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { ProfileForm } from "@/components/Profile/ProfileForm";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
          <p className="text-sm font-medium text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <UserRound className="h-7 w-7 text-emerald-600" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Sign in to view your profile
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please log in to access your personal information.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Go to Login
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const memberInitial = user.name?.charAt(0).toUpperCase() || "U";

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <HandHeart size={18} />
            KindredPulse
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Profile Banner */}
          <div className="h-32 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 sm:h-40" />

          {/* Profile Information */}
          <div className="px-6 pb-8 sm:px-10">

            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              {/* Avatar and User Information */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-emerald-100 text-3xl font-bold text-emerald-700 shadow-md sm:h-28 sm:w-28">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile picture"}
                      width={112}
                      height={112}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    memberInitial
                  )}
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.name || "Unnamed User"}
                  </h2>

                  <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={15} />
                    {user.email}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <ShieldCheck size={14} />
                    {user.emailVerified ? "Verified Account" : "Unverified Account"}
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Link
                href="#profile-settings"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Pencil size={16} />
                Edit Profile
              </Link>

            </div>
          </div>
        </div>

        {/* Account Overview */}
        <section className="mt-8">
          <div className="mb-5 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900">
              Account Overview
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Verification Status */}
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <ShieldCheck className="text-emerald-600" size={21} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email Verification
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
                <CalendarDays className="text-teal-600" size={21} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Member Since
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {memberSince}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Profile Settings */}
        <section
          id="profile-settings"
          className="mt-8 scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <ProfileForm user={user} />
        </section>

      </div>
    </main>
  );
}
