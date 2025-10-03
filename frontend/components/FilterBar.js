'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterBar({ categories, tags, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  useEffect(() => {
    const urlCategory = searchParams.get('category') || '';
    const urlTag = searchParams.get('tag') || '';

    setSelectedCategory(urlCategory);
    setSelectedTag(urlTag);
  }, [searchParams]);

  // Update filters and URL
  const updateFilter = (type, value) => {
    const newCategory = type === 'category' ? value : selectedCategory;
    const newTag = type === 'tag' ? value : selectedTag;

    setSelectedCategory(newCategory);
    setSelectedTag(newTag);

    // Update URL
    const params = new URLSearchParams(searchParams);
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }

    if (newTag) {
      params.set('tag', newTag);
    } else {
      params.delete('tag');
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { shallow: true });

    // Notify parent component
    if (onFilterChange) {
      onFilterChange({ category: newCategory, tag: newTag });
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');

    // Clear URL params except search
    const params = new URLSearchParams();
    const search = searchParams.get('search');
    if (search) {
      params.set('search', search);
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { shallow: true });

    // Notify parent component
    if (onFilterChange) {
      onFilterChange({ category: '', tag: '' });
    }
  };

  return (
    <div className="mb-8 p-4 border border-gray-200 rounded">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Category Filter */}
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-400 rounded text-gray-900 focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Tag
          </label>
          <select
            value={selectedTag}
            onChange={(e) => updateFilter('tag', e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-400 rounded text-gray-900 focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm bg-gray-700 text-white border border-gray-700 rounded hover:bg-gray-800 transition-colors font-medium"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
