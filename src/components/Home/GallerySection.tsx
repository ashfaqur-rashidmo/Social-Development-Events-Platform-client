import {
    Cookie,
    LockKeyhole,
    Package,
    Stethoscope,
    TreePine,
} from 'lucide-react';
import React from 'react';

const galleryItems = [
    {
        src: 'https://www.intertek.com/contentassets/a586c77e773f44b8807c238c23ea1431/winter-clothes-and-bankets-donation-header.jpg',
        location: 'WARD 03 | OLD DHAKA',
        title: 'Warmth handover during severe cold snap',
        stat: '420 items deployed',
        icon: Cookie,
        accent: 'text-yellow-300',
    },
    {
        src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
        location: 'SECTOR 13 | UTTARA',
        title: 'Canopy restoration & embankment defense',
        stat: '850 trees rooted',
        icon: TreePine,
        accent: 'text-emerald-300',
    },
    {
        src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433',
        location: 'TOWN HALL | MOHAMMADPUR',
        title: 'Assembly line for weekly ration boxes',
        stat: '650 families reached',
        icon: Package,
        accent: 'text-yellow-300',
    },
    {
        src: 'https://images.unsplash.com/photo-1584515933487-779824d29309',
        location: 'RAYERBAZAR | DHANMONDI',
        title: 'Pediatric triage and preventive diagnostics',
        stat: '140 checks finished',
        icon: Stethoscope,
        accent: 'text-rose-300',
    },
];

const GallerySection = () => {
    return (
        <section className="bg-gray-50 px-6 py-16">
            <div className="max-w-8xl mx-auto">
                {/* Heading row */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-teal-700">
                            Field Documentation
                        </p>
                        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                            Ground Realities &amp; Civic Impact
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">
                            Photographic records certified by local beneficiary
                            field coordinators.
                        </p>
                    </div>

                    <span className="inline-flex w-fit items-center gap-2 self-start md:self-auto bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg px-4 py-2.5 shadow-sm">
                        <LockKeyhole size={14} />
                        All metadata SHA-256 stamped
                    </span>
                </div>

                {/* Photo cards */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {galleryItems.map((item) => (
                        <figure
                            key={item.location}
                            className="relative overflow-hidden rounded-xl shadow-sm aspect-[4/5] group"
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                            <figcaption className="absolute inset-x-0 bottom-0 p-4">
                                <p
                                    className={`text-[11px] font-bold tracking-wide uppercase ${item.accent}`}
                                >
                                    {item.location}
                                </p>
                                <h3 className="mt-1.5 text-sm font-bold text-white leading-snug">
                                    {item.title}
                                </h3>
                                <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-200">
                                    <item.icon size={13} />
                                    {item.stat}
                                </p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
