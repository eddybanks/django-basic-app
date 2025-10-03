export default async function Home() {
  const API_URL = "http://127.0.0.1:8001/api/products/";

  const fetchProductList = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results || data; // DRF pagination returns results array
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return empty array on error
    }
  };

  const productList = await fetchProductList();

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
        {productList && productList.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productList.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category ? product.category : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.tags && product.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {product.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {typeof tag === "object" ? tag.name : tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-500 text-sm">
                No products available or unable to load data.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
