import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adPostsAPI, authAPI, packageAPI } from "../services/api";

const Profile = () => {
  const [userAds, setUserAds] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("ads");
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  useEffect(() => {
    fetchUserData();
    fetchUserAds();
    fetchPackages();
  }, []);

  const fetchUserData = async () => {
    try {
      const result = await authAPI.getUser();
      if (result.success) {
        setUser(result.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserAds = async () => {
    try {
      const result = await adPostsAPI.getMyAds();
      if (result.success) {
        setUserAds(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching user ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const result = await packageAPI.getAll();
      if (result.success) {
        setPackages(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleAdAction = async (adId: string, action: string) => {
    try {
      let result;
      switch (action) {
        case 'inactive':
          result = await adPostsAPI.markInactive(adId);
          break;
        case 'publish':
          result = await adPostsAPI.publish(adId);
          break;
        case 'feature':
          result = await adPostsAPI.makeFeatured(adId);
          break;
        case 'sold':
          result = await adPostsAPI.markSold(adId);
          break;
        case 'remove':
          result = await adPostsAPI.remove(adId);
          break;
        default:
          return;
      }

      if (result.success) {
        alert(`Ad ${action} successful!`);
        fetchUserAds(); // Refresh ads
      } else {
        alert(result.message || `Failed to ${action} ad`);
      }
    } catch (error) {
      console.error(`Error ${action} ad:`, error);
      alert(`Error ${action} ad`);
    }
  };

  const handleProfilePicUpload = async () => {
    if (!profilePic) return;

    const formData = new FormData();
    formData.append('image', profilePic);

    try {
      const result = await authAPI.uploadDisplayPicture(formData);
      if (result.success) {
        alert('Profile picture updated!');
        fetchUserData();
      } else {
        alert(result.message || 'Failed to upload profile picture');
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert('Error uploading profile picture');
    }
  };

  const subscribeToPackage = async (packageId: string) => {
    try {
      const result = await packageAPI.subscribe(packageId);
      if (result.success) {
        alert('Package subscribed successfully!');
        fetchPackages();
      } else {
        alert(result.message || 'Failed to subscribe to package');
      }
    } catch (error) {
      console.error("Error subscribing to package:", error);
      alert('Error subscribing to package');
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading your profile...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to home
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        
        {/* Profile Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">{user?.name?.[0] || 'U'}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name || 'User Name'}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">Member since {new Date(user?.created_at).getFullYear() || '2024'}</p>
          </div>
        </div>

        {/* Profile Picture Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Update Profile Picture</label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleProfilePicUpload}
              disabled={!profilePic}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userAds.length}</div>
            <div className="text-sm text-gray-600">Total Ads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {userAds.filter(ad => ad.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Ads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {userAds.filter(ad => ad.is_featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Ads</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("ads")}
            className={`px-6 py-3 font-medium ${
              activeTab === "ads"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            My Ads ({userAds.length})
          </button>
          <button
            onClick={() => setActiveTab("packages")}
            className={`px-6 py-3 font-medium ${
              activeTab === "packages"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Packages ({packages.length})
          </button>
        </div>

        <div className="p-6">
          {activeTab === "ads" ? (
            <div>
              {userAds.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No ads found</p>
                  <Link
                    to="/sell"
                    className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg"
                  >
                    Post Your First Ad
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userAds.map((ad) => (
                    <div key={ad._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={ad.assets?.[0] ? `http://localhost:8080/adpost_assets/${ad.assets[0]}` : `https://via.placeholder.com/80x80?text=${encodeURIComponent(ad.category || 'Ad')}`}
                        alt={ad.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{ad.title}</h3>
                        <p className="text-gray-600">₹{Number(ad.price).toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-500">{ad.category}</p>
                        <p className="text-xs text-gray-400">
                          Posted: {new Date(ad.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded ${
                            ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {ad.status}
                          </span>
                          {ad.is_featured && (
                            <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                          {ad.is_sold && (
                            <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                              Sold
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleAdAction(ad._id, ad.status === 'active' ? 'inactive' : 'publish')}
                          className={`px-3 py-1 rounded text-sm ${
                            ad.status === 'active'
                              ? "bg-orange-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {ad.status === 'active' ? 'Deactivate' : 'Publish'}
                        </button>
                        <button
                          onClick={() => handleAdAction(ad._id, 'feature')}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                        >
                          Feature
                        </button>
                        <button
                          onClick={() => handleAdAction(ad._id, 'sold')}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                        >
                          Mark Sold
                        </button>
                        <button
                          onClick={() => handleAdAction(ad._id, 'remove')}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {packages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No packages available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <div key={pkg._id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg">{pkg.name}</h3>
                      <p className="text-gray-600 mb-2">{pkg.description}</p>
                      <p className="text-2xl font-bold text-green-600 mb-4">₹{pkg.price}</p>
                      <ul className="text-sm text-gray-600 mb-4">
                        {pkg.features?.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => subscribeToPackage(pkg._id)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Subscribe
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;