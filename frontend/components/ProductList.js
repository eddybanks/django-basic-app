export default function ProductList({ products, searchQuery }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? "No Results Found" : "No Products Found"}
          </h3>
          <p className="text-gray-500 text-sm">
            {searchQuery
              ? `No products match "${searchQuery}". Try different search terms.`
              : "No products available or unable to load data."}
          </p>
        </div>
      </div>
    );
  }

  return (
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
          {products.map((product) => (
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
                        {tag.name}
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
  );
}
