
"use client";

import {
  CircleCheckBig,
  MapPin,
  Shirt,
  Users,
  ArrowUpRight,
} from "lucide-react";
import React from "react";

const stats = [
  {
    icon: Shirt,
    label: "Winter Relief",
    value: "14,850+",
    sub: "Warm Garments Distributed",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Users,
    label: "Community",
    value: "3,200+",
    sub: "Volunteers Mobilized",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: CircleCheckBig,
    label: "Completed Drives",
    value: "180+",
    sub: "Successful Local Initiatives",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: MapPin,
    label: "Geographic Reach",
    value: "12",
    sub: "Wards & Thanas Covered",
    color: "bg-violet-50 text-violet-700",
  },
];

const ImpactStats = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 px-6 py-14 lg:py-16">

      <div className="max-w-8xl mx-auto">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700 mb-2">
              Our Collective Impact
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Small Actions, Lasting Change
            </h2>

            <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xl">
              Every contribution creates a measurable difference in our
              communities.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-2 w-fit">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Community Impact Overview
          </span>

        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300"
            >

              {/* Top Section */}
              <div className="flex items-center justify-between">

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={23} strokeWidth={1.8} />
                </div>

                <ArrowUpRight
                  size={19}
                  className="text-slate-300 group-hover:text-emerald-600 transition-colors duration-300"
                />

              </div>

              {/* Content */}
              <div className="mt-6">

                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>

                <h3 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {stat.sub}
                </p>

              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full"></div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ImpactStats;
