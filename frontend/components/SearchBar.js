'use client';

export default function SearchBar({ searchQuery, onSearchChange, placeholder = "Search products..." }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-600"
      />
    </div>
  );
}
