"use client";

import { Archive, BadgeCheck, MapPin, MousePointerClick } from 'lucide-react';
import React from 'react';

const features = [
    {
        icon: BadgeCheck,
        title: 'Verified Organizers & Trust',
        body: 'Every drive organizer completes identity & institutional check to prevent fraudulent donations and performative campaigns.',
        tile: 'bg-emerald-400 text-emerald-900',
    },
    {
        icon: MapPin,
        title: 'Geotagged Local Impact',
        body: 'Pinpoint initiatives specifically in Mirpur, Mohammadpur, Dhanmondi, Uttara, and adjacent wards within walking distance.',
        tile: 'bg-orange-100 text-amber-700',
    },
    {
        icon: MousePointerClick,
        title: 'Real-Time Participation',
        body: 'One-click volunteer RSVPs with dynamic quota allocation. Instant shift reminders ensure zero overbooking or abandoned stations.',
        tile: 'bg-blue-100 text-blue-700',
    },
    {
        icon: Archive,
        title: 'Zero Waste & Transparency',
        body: 'Recipient handovers are timestamped and logged. See real metrics for every blanket, ration pack, and tree sapling deployed.',
        tile: 'bg-indigo-100 text-indigo-700',
    },
];

const FeatureSection = () => {
    return (
        <section className="border-t border-gray-200 bg-[#eef0fa] px-6 py-16">
            <div className="max-w-8xl mx-auto">
                {/* Heading */}
                <div className="text-center">
                    <p className="text-xs font-bold tracking-widest uppercase text-teal-700">
                        Transparent Civic Infrastructure
                    </p>
                    <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                        Why KindredPulse Works
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                        Built from ground truth experiences of Dhaka youth organizers
                        to replace unverified social media chaos with tangible,
                        audited civic accountability.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-7"
                        >
                            <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${feature.tile}`}>
                                <feature.icon size={20} />
                            </span>

                            <h3 className="mt-5 text-lg font-bold text-slate-900">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">{feature.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
