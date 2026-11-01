import React from 'react';

import { HandHeart, X } from 'lucide-react';
import Link from 'next/link';


const GithubMark = () => (
    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
);

const columns = [
    {
        heading: 'Community',
        links: [
            { label: 'Upcoming Events', href: '/upcoming-events' },
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Impact Stories', href: '/impact-stories' },
            { label: 'SDG Alignment', href: '/sdg-alignment' },
        ],
    },
    {
        heading: 'Action',
        links: [
            { label: 'Create Event', href: '/create-event' },
            { label: 'Volunteer Login', href: '/login' },
            { label: 'Organizer Handbook', href: '/organizer-handbook' },
        ],
    },
    {
        heading: 'Governance',
        links: [
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Service', href: '/terms-of-service' },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="max-w-8xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_0.9fr]">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2.5">
                        <span className="bg-emerald-700 text-white w-10 h-10 rounded-xl flex items-center justify-center">
                            <HandHeart size={22} />
                        </span>
                        <span className="text-2xl font-bold text-emerald-800 tracking-tight">
                            KindredPulse
                        </span>
                    </div>

                    <p className="mt-4 text-sm text-gray-600 max-w-xs leading-relaxed">
                        Mobilizing local civic action for verified SDG social impact.
                        Connect with verified neighborhood initiatives and track
                        tangible community progress.
                    </p>

                    <div className="mt-5 flex items-center gap-2.5">
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 border border-gray-300 rounded-lg flex items-center justify-center text-slate-900 hover:bg-gray-50 transition"
                            aria-label="X (Twitter)"
                        >
                            <X size={16} />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 border border-gray-300 rounded-lg flex items-center justify-center text-slate-700 hover:bg-gray-50 transition"
                            aria-label="GitHub"
                        >
                            <GithubMark />
                        </a>
                    </div>
                </div>

                {/* Link columns */}
                {columns.map((column) => (
                    <div key={column.heading}>
                        <h4 className="text-xs font-bold tracking-wider uppercase text-gray-900">
                            {column.heading}
                        </h4>
                        <ul className="mt-4 space-y-2.5">
                            {column.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 hover:text-teal-700 transition"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
                    <p>
                        © 2024 KindredPulse. Mobilizing local civic action for verified
                        SDG social impact.
                    </p>
                    <p>Dhaka Civil Society Initiative · All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
