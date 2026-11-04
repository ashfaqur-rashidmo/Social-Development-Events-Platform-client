"use client";

interface EventFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

const EventFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  clearFilters,
}: EventFiltersProps) => {
  return (
    <div className="mb-8">
      {/* Category Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 md:shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="text"
            placeholder="Search events or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-emerald-950"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory !== "All" || searchQuery !== "") && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;