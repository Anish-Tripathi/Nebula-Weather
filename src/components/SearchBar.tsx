import React, { useState } from "react";
import { Search } from "lucide-react";
import { MapPinIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onUseCurrentLocation: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onUseCurrentLocation,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city or location..."
          className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-lg transition-all"
        />
        <Search className="absolute left-3 text-slate-400 h-5 w-5" />

        <button
          type="submit"
          className="absolute right-3 bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-lg transition-colors duration-200"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      <button
        onClick={onUseCurrentLocation}
        className="mt-2 text-sm text-slate-400 hover:text-purple-400 transition-colors duration-200 flex items-center justify-center w-full gap-2"
      >
        <MapPinIcon className="h-4 w-4" />
        Use my current location
      </button>
    </div>
  );
};

export default SearchBar;
