import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { favoritesAPI } from "../services/api";

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Refetch favorites when a product is added from Home
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'favoritesUpdated') {
        fetchFavorites();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchFavorites = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const result = await favoritesAPI.getAdposts();
      console.log('Favorites API response:', result);
      
      if (result.data && Array.isArray(result.data)) {
        setFavoriteProducts(result.data);
      } else if (Array.isArray(result)) {
        setFavoriteProducts(result);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (adpostId: string) => {
    try {
      const response = await favoritesAPI.remove(adpostId);
      if (response && response.message === 'Adpost removed from favourites') {
        setFavoriteProducts(prev => prev.filter(product => product._id !== adpostId));
        localStorage.setItem('favoritesUpdated', Date.now().toString()); // Notify other tabs/components
      } else {
        alert(response.message || 'Error removing from favorites');
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert('Error removing from favorites');
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading your favorites...</div>;
  }

  const token = localStorage.getItem('authToken');
  if (!token) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Please login to view favorites</h2>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <Link to="/" className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1 className="text-xl font-bold">My Favorites</h1>
          <span className="ml-2 text-gray-500">({favoriteProducts.length})</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4">
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">Start adding items to your favorites by clicking the heart icon</p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favoriteProducts.map((favorite) => (
              <div key={favorite._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
                {/* Remove from favorites button */}
                <button
                  onClick={() => removeFavorite(favorite._id)}
                  className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
                >
                  <svg className="w-5 h-5 fill-red-500 text-red-500" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>

                <Link to="/details" state={{ data: favorite }}>
                  <div className="p-3">
                    <div className="aspect-square overflow-hidden rounded mb-3">
                      {Array.isArray(favorite.images) && favorite.images.length > 0 ? (
                        <img 
                          src={favorite.images[0].startsWith('http') ? favorite.images[0] : `http://13.200.179.78/${favorite.images[0]}`}
                          alt={favorite.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      ) : favorite.assets?.[0] ? (
                        <img 
                          src={`http://13.200.179.78/adpost_assets/${favorite.assets[0]}`}
                          alt={favorite.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      ) : favorite.thumb ? (
                        <img 
                          src={`http://13.200.179.78/${favorite.thumb}`}
                          alt={favorite.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">{favorite.category}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h1 className="font-bold text-lg text-gray-900 mb-1">
                        ₹{favorite.price ? Number(favorite.price).toLocaleString('en-IN') : 'N/A'}
                      </h1>
                      <h2 className="text-sm text-gray-800 line-clamp-2 mb-2">
                        {favorite.title || 'No Title'}
                      </h2>
                      <p className="text-xs text-gray-600 mb-1">
                        {favorite.category || 'Uncategorized'}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                        </svg>
                        {favorite.location || 'Location not specified'}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;