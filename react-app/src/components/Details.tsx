import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const { data } = location.state || {};

  if (!data) {
    return <div className="text-center p-10">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image section */}
        <div className="md:w-1/2">
          <img 
            src={data?.thumb ? `http://13.200.179.78/${data.thumb}` : "https://via.placeholder.com/400"} 
            alt={data.title || "Product"} 
            className="w-full h-auto rounded-lg shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/400";
            }}
          />
          
          {/* Additional images if available */}
          {data.assets && data.assets.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {data.assets.map((asset: any, index: number) => (
                <img 
                  key={index}
                  src={`http://13.200.179.78/${asset.url}`}
                  alt={`${data.title} - image ${index + 1}`}
                  className="w-full h-24 object-cover rounded cursor-pointer"
                  onClick={(e) => {
                    const mainImg = e.currentTarget.parentElement?.previousElementSibling as HTMLImageElement;
                    if (mainImg) mainImg.src = `http://13.200.179.78/${asset.url}`;
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://via.placeholder.com/100";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{data.title || "No Title"}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">₹{data.price || "N/A"}</p>
          <p className="text-gray-600 mb-2">Category: {data.category || "Uncategorized"}</p>
          <p className="text-gray-600 mb-4">Location: {data.city || data.location || "Unknown"}</p>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{data.description || "No description available"}</p>
          </div>
          
          {/* Additional details */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.condition && <div><span className="font-medium">Condition:</span> {data.condition}</div>}
              {data.brand && <div><span className="font-medium">Brand:</span> {data.brand}</div>}
              {data.model && <div><span className="font-medium">Model:</span> {data.model}</div>}
              {data.year && <div><span className="font-medium">Year:</span> {data.year}</div>}
            </div>
          </div>
          
          {/* Contact info */}
          <div className="mt-8">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
