import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

const Details = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [showPhone, setShowPhone] = useState(false);

  if (!data) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl text-gray-500">Product not found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Go back to home
        </Link>
      </div>
    );
  }

  const getImageUrl = (product: any) => {
    // Use original API image if available
    if (product?.thumb) {
      return `http://13.200.179.78/${product.thumb}`;
    }
    
    // Static category-based images for details page
    const categoryImages = {
      'Cars': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&auto=format',
      'Mobiles': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&auto=format',
      'Properties': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&auto=format',
      'Electronics & Appliances': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop&auto=format',
      'Furniture': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&auto=format',
      'Fashion': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop&auto=format',
      'Bikes': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format',
      'Books, Sports & Hobbies': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format',
      'Jobs': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&auto=format',
      'Pets': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop&auto=format',
      'Services': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format'
    };
    
    return categoryImages[product?.category as keyof typeof categoryImages] || 
           'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&auto=format';
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <img 
              src={getImageUrl(data)}
              alt={data.title} 
              className="w-full h-96 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Product';
              }}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-3xl font-bold text-green-600 mb-4">₹{Number(data.price).toLocaleString('en-IN')}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div><span className="font-medium text-gray-600">Category:</span> <span className="text-gray-800">{data.category}</span></div>
              <div><span className="font-medium text-gray-600">Condition:</span> <span className="text-gray-800">{data.condition || 'Good'}</span></div>
              <div><span className="font-medium text-gray-600">Location:</span> <span className="text-gray-800">{data.location || data.city}</span></div>
              <div><span className="font-medium text-gray-600">Posted:</span> <span className="text-gray-800">{new Date(data.created_at || Date.now()).toLocaleDateString()}</span></div>
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{data.description || 'No description available.'}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {data.seller_name?.[0] || 'S'}
                </div>
                <div>
                  <p className="font-medium">{data.seller_name || 'Seller'}</p>
                  <p className="text-sm text-gray-600">Member since 2024</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                {showPhone ? data.phone || "+91 XXXXX XXXXX" : "Show Phone Number"}
              </button>
              
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
                Chat with Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;