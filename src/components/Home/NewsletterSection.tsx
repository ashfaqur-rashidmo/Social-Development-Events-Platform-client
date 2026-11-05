"use client";

import { HandHeart, Send, Siren } from 'lucide-react';
import React from 'react';

const NewsletterSection = () => {
    return (
        <section className="bg-[#f1f0fa] px-6 py-16">
            <div className="max-w-8xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-700 to-[#04583f] px-8 py-12 md:px-12">
                    {/* Watermark icon */}
                    <HandHeart
                        size={260}
                        className="absolute -right-6 top-1/2 -translate-y-1/2 text-white/10 rotate-12 pointer-events-none"
                        strokeWidth={1.2}
                    />

                    <div className="relative max-w-2xl">
                        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5">
                            <Siren size={13} className="text-white" />
                            <span className="text-xs font-semibold text-white">
                                Dhaka Rapid Response Dispatch
                            </span>
                        </span>

                        <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                            Stay Alert for Local Emergency Drives
                        </h2>

                        <p className="mt-3 text-sm md:text-base text-emerald-50/90">
                            When cold waves hit or flash emergency relief is needed,
                            receive instant neighborhood alerts with verified rendezvous
                            coordinates.
                        </p>

                        <form className="mt-7 flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email (e.g., civic@dhaka.org)"
                                className="flex-1 bg-white rounded-lg px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3.5 rounded-lg transition"
                            >
                                Subscribe
                                <Send size={16} />
                            </button>
                        </form>

                        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-100/80">
                            Zero spam. Only weekly verified event bulletins in your
                            neighborhood.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
