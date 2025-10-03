"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const BASE_API_URL = "http://127.0.0.1:8000/api/products/";

  const fetchProducts = useCallback(
    async (searchTerm = "") => {
      try {
        setLoading(true);

        const url = searchTerm.trim()
          ? `${BASE_API_URL}?search=${encodeURIComponent(searchTerm.trim())}`
          : BASE_API_URL;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const productList = data.results || data;
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [BASE_API_URL]
  );

  const updateURL = (query) => {
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    router.push(newUrl, { shallow: true });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    updateURL(query);
    fetchProducts(query);
  };

  // Initialize from URL params and fetch initial data
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchQuery(urlSearch);
    fetchProducts(urlSearch);
  }, [searchParams, fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Product Catalog
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          placeholder="Search products by name, description, category, or tags..."
        />
        <ProductList
          products={products}
          loading={loading}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}
