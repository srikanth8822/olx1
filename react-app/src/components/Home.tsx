import { Link } from "react-router-dom";

type ProductsProp = {
  products: any[];
  search: string;
  menu: string;
  location: string;
};

const Home = (props: ProductsProp) => {
  // Ensure products is an array before using filter and map
  const productsArray = Array.isArray(props?.products) ? props.products : [];
  
  // Filter products based on search, menu, and location criteria
  const filteredProducts = productsArray.filter((data) => {
    // If no filters are applied, show all products
    if (!props.search && !props.menu && !props.location) {
      return true;
    }
    
    // Check if product matches search term
    const matchesSearch = !props.search || 
      (data?.title?.toLowerCase().includes(props.search.toLowerCase()));
    
    // Check if product matches selected category
    const matchesCategory = !props.menu || 
      (data?.category === props.menu);
    
    // Check if product matches selected location
    const matchesLocation = !props.location || 
      (data?.city === props.location || data?.location === props.location);
    
    // Product must match all applied filters
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="px-2 sm:px-4 lg:px-6 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((data) => (
            <Link key={data?._id} to="/details" state={{ data: data }}>
              <div className="border border-gray-200 p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
                <img 
                  src={data?.thumb ? `http://13.200.179.78/${data?.thumb}` : "https://via.placeholder.com/150"} 
                  alt={data?.title || "Product"} 
                  className="w-full h-32 sm:h-40 md:h-48 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://via.placeholder.com/150";
                  }}
                />
                <div className="mt-2">
                  <h1 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">
                    ₹{data?.price || "N/A"}
                  </h1>
                  <h2 className="text-xs sm:text-sm md:text-base text-gray-800 truncate mt-1">
                    {data?.title || "No Title"}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    {data?.category || "Uncategorized"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {data?.city || data?.location || ""}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h2 className="text-lg sm:text-xl text-gray-500">
              No products found matching your criteria
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;