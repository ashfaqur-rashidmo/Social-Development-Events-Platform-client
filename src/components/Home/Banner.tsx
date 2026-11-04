
import {
  ArrowRight,
  CirclePlus,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="bg-linear-to-br from-[#faf9ff] via-slate-50 to-slate-200/60 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">

        {/* Left: Content */}
        <div className="flex flex-col justify-center">

          <span className="inline-flex w-fit items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-700">
              Chittagong Grassroots Winter Mobilization Active
            </span>
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-tight tracking-tight text-slate-900">
            Empower Your Community{" "}
            <br className="hidden lg:block" />
            Through{" "}
            <span className="text-emerald-700">
              Purposeful Action
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-600 max-w-xl">
            Discover, organize, and join verified grassroots civic drives
            across Dhaka and beyond. From winter warmth distribution to
            urban greening — make every hour count.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3.5 rounded-lg shadow-sm transition duration-200"
            >
              Explore Upcoming Events
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold px-6 py-3.5 rounded-lg shadow-sm transition duration-200"
            >
              <CirclePlus size={18} />
              Create an Event
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-gray-700">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-700" />
              100% Verified Organizers
            </span>

            <span className="inline-flex items-center gap-2">
              <Handshake size={16} className="text-emerald-700" />
              Zero Middlemen Handover
            </span>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative w-full">

          {/* Image Container */}
          <div className="relative w-full max-w-[28rem] mx-auto aspect-[4/3] lg:aspect-[14/15] overflow-hidden rounded-2xl shadow-xl">

            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85"
              alt="Volunteers distributing winter clothes to the community"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 448px"
              className="object-cover object-center"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Banner;
