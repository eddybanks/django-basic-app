import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";

const BASE_API_URL = "http://127.0.0.1:8000/api/products/";

// Server-side function to fetch data
async function fetchProducts(searchParams) {
  try {
    // Build API query parameters
    const params = new URLSearchParams();
    const search = searchParams.search || "";
    const category = searchParams.category || "";
    const tag = searchParams.tag || "";

    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);

    const url = `${BASE_API_URL}${
      params.toString() ? "?" + params.toString() : ""
    }`;

    const response = await fetch(url, {
      cache: "no-store", // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results || data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Server-side function to fetch filter options
async function fetchFilterOptions() {
  try {
    const response = await fetch(BASE_API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const productList = data.results || data;

    // Extract available categories and tags for filters
    const uniqueCategories = [
      ...new Set(
        productList
          .map((p) => p.category)
          .filter(Boolean)
          .map((cat) => (typeof cat === "object" ? cat.name : cat))
      ),
    ];

    const uniqueTags = [
      ...new Set(
        productList.flatMap((p) => p.tags || []).map((tag) => tag.name)
      ),
    ];

    return { categories: uniqueCategories, tags: uniqueTags };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return { categories: [], tags: [] };
  }
}

export default async function Home({ searchParams }) {
  // Await searchParams before using its properties (Next.js 15 requirement)
  const resolvedSearchParams = await searchParams;

  // Fetch data on server-side
  const products = await fetchProducts(resolvedSearchParams);
  const { categories, tags } = await fetchFilterOptions();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-medium text-gray-900">
            Product Catalog
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Client-side components for interactivity */}
        <SearchBar placeholder="Search products..." />
        <FilterBar categories={categories} tags={tags} />

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </div>

        {/* Products */}
        <ProductList products={products} />
      </main>
    </div>
  );
}
