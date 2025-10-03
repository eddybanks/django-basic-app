'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({
  onSearchChange,
  placeholder = "Search products...",
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchQuery(urlSearch);
  }, [searchParams]);

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchQuery(value);

    // Update URL
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    router.push(newUrl, { shallow: true });

    // Notify parent component
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:border-gray-500"
      />
    </div>
  );
}
