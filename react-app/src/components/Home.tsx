import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsProps, Product } from "../types";
import { favoritesAPI } from "../services/api";

const Home = (props: ProductsProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    

  }, []);
  
  useEffect(() => {
    const fetchInitialFavorites = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setFavorites([]);
        return;
      }
      try {
        const result = await favoritesAPI.getAdposts();
        if (result.data && Array.isArray(result.data)) {
          setFavorites(result.data.map((ad: any) => ad._id));
        } else if (Array.isArray(result)) {
          setFavorites(result.map((ad: any) => ad._id));
        }
      } catch (error) {
        setFavorites([]);
      }
    };
    fetchInitialFavorites();
  }, []);

  
  const toggleFavorite = async (productId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to add favorites');
      return;
    }

    try {
      if (!favorites.includes(productId)) {
        const response = await favoritesAPI.add(productId);
        if (response && response.message === 'Adpost added to favourites') {
          setFavorites(prev => [...prev, productId]);
          localStorage.setItem('favoritesUpdated', Date.now().toString()); // Notify other tabs/components
          alert('Added to favorites');
        } else if (response && response.message === 'Adpost already in favourites') {
          alert('Already in favorites');
        } else {
          alert(response.message || 'Error adding to favorites');
        }
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      alert('Error adding to favorites');
    }
  };
  
  const productsArray = Array.isArray(props.products) ? props.products : [];
  
  const filteredProducts = productsArray.filter((data) => {
    if (!props.search && !props.menu && !props.location) {
      return true;
    }
    
    const matchesSearch = !props.search || 
      (data.title?.toLowerCase().includes(props.search.toLowerCase()));
    
    const matchesCategory = !props.menu || 
      (data.category === props.menu);
    
    const matchesLocation = !props.location || 
      (data.location === props.location || data.city === props.location);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getImageUrl = (product: Product) => {
    // Use uploaded image (base64) for user products
    if (product?.thumb && product.thumb.startsWith('data:image')) {
      return product.thumb;
    }
    
    // Use uploaded images array
    if (product?.images && product.images.length > 0 && product.images[0].startsWith('data:image')) {
      return product.images[0];
    }
    
    // Use original API image if available
    if (product?.thumb) {
      return `http://13.200.179.78/${product.thumb}`;
    }
    
    // Fallback placeholder
    return `https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=${encodeURIComponent(product?.category || 'Product')}`;
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} ads found
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((data, index) => (
              <Link key={data._id || index} to="/details" state={{ data: data }}>
                <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden relative">
                  <button
                    onClick={(e) => toggleFavorite(data._id, e)}
                    className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white bg-opacity-90 shadow-sm"
                  >
                    <svg 
                      className={`w-5 h-5 ${favorites.includes(data._id) ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600'}`}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={getImageUrl(data)}
                      alt={data.title || "Product"} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://via.placeholder.com/300x200/6B7280/FFFFFF?text=${encodeURIComponent(data.category || 'Product')}`;
                      }}
                    />
                  </div>

                  <div className="p-3">
                    <h1 className="font-bold text-lg text-gray-900 mb-1">
                      ₹{data.price ? Number(data.price).toLocaleString('en-IN') : "N/A"}
                    </h1>
                    <h2 className="text-sm text-gray-800 mb-2 line-clamp-2">
                      {data.title || "No Title"}
                    </h2>
                    <p className="text-xs text-gray-500 mb-1">
                      {data.category || "Uncategorized"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {data.location || data.city || "Location"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h2 className="text-xl text-gray-500">No products found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;