import olx from "../assets/olx.png"
import lens from "../assets/lens.png"
import arrow from "../assets/arrow.png"
import search from "../assets/search.png"
import Login from "./Login"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

type NavbarProps = {
  setSearch: any;
  setLocation: (location: string) => void;
}

const Navbar = (props: NavbarProps) => {
  const [loginPop, setLoginPop] = useState(false)
  const [locations, setLocations] = useState<string[]>([])
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Location")
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Get unique locations from all products
    const getProductLocations = () => {
      const userProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
      const apiLocations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'];
      
      const userLocations = userProducts.map((product: any) => product.location).filter(Boolean);
      const allLocations = [...new Set([...userLocations, ...apiLocations])];
      
      setLocations(allLocations);
    };

    const fetchUserData = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    };

    getProductLocations();
    fetchUserData();
  }, []);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setShowLocationDropdown(false);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            
            if (response.ok) {
              const data = await response.json();
              const city = data.address?.city || 
                          data.address?.town || 
                          data.address?.village || 
                          data.address?.suburb ||
                          data.address?.state_district ||
                          "Current Location";
              
              setSelectedLocation(city);
              props.setLocation(city);
            } else {
              setSelectedLocation("Current Location");
              props.setLocation("Current Location");
            }
          } catch (error) {
            console.error("Error getting location name:", error);
            setSelectedLocation("Current Location");
            props.setLocation("Current Location");
          } finally {
            setIsGettingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please allow location access.");
          setIsGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsGettingLocation(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <>
    {/* Mobile View */}
    <div className="md:hidden">
      <div className="flex justify-between items-center p-3 bg-slate-100">
        <Link to="/">
          <img src={olx} className="w-11 h-9"/>
        </Link>
        <div className="flex items-center space-x-3">
          <Link to="/favorites" className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </Link>
          {user ? (
            <div className="flex items-center space-x-2">
              <Link to="/profile" className="text-sm font-semibold text-gray-700">
                {user.name}
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-semibold text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div 
              onClick={()=> setLoginPop(!loginPop)} 
              className="text-sm font-semibold text-gray-700"
            >
              Login
            </div>
          )}
          <Link to="/sell" className="bg-yellow-400 px-3 py-1 rounded-full">
            <span className="text-xs font-bold">SELL</span>
          </Link>
        </div>
      </div>
      
      <div className="relative px-3 pb-2 bg-slate-100">
        <div 
          className="flex items-center border border-gray-300 rounded p-2 bg-white"
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
        >
          <img src={lens} className="w-4 h-4 mr-2"/>
          <span className="flex-1 text-sm text-gray-700">{selectedLocation}</span>
          <img src={arrow} className="w-4 h-4"/>
        </div>
        
        {showLocationDropdown && (
          <div className="absolute top-full left-3 right-3 mt-1 bg-white border rounded shadow-lg z-10 max-h-60 overflow-y-auto">
            <div
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer font-medium text-blue-500 border-b flex items-center"
              onClick={getCurrentLocation}
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              {isGettingLocation ? "Getting location..." : "Use current location"}
            </div>
            <div
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer font-medium text-gray-600 border-b"
              onClick={() => {
                setSelectedLocation("All India")
                props.setLocation("")
                setShowLocationDropdown(false)
              }}
            >
              All India
            </div>
            {locations.map((location, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setSelectedLocation(location)
                  props.setLocation(location)
                  setShowLocationDropdown(false)
                }}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="px-3 pb-3 bg-slate-100">
        <div className="flex items-center border border-gray-300 rounded bg-white">
          <input 
            onChange={(e)=> props?.setSearch(e.target.value)} 
            placeholder="Find Cars, Mobile phones and more..." 
            className="flex-1 p-3 outline-none text-sm"
          />
          <div className="p-3">
            <img src={search} className="w-5 h-5"/>
          </div>
        </div>
      </div>
    </div>

    {/* Desktop View */}
    <div className="hidden md:flex p-4 bg-slate-100 shadow-md">
      <Link to="/">
        <img src={olx} className="w-11 h-9"/>
      </Link>
      
      <div className="flex space-x-4 ml-5 flex-1">
        <div className="relative">
          <div 
            className="flex border-2 border-spacing-1 w-64 p-2 border-black bg-white cursor-pointer"
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <img src={lens} className="w-6 h-5 mt-1"/>
            <input 
              value={selectedLocation}
              placeholder="Location" 
              className="ml-3 outline-none cursor-pointer flex-1" 
              readOnly
            />
            <img src={arrow} className="w-8 h-7"/>
          </div>
          
          {showLocationDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border-2 border-black rounded shadow-lg z-10 w-full max-h-60 overflow-y-auto">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-blue-500 flex items-center border-b"
                onClick={getCurrentLocation}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                {isGettingLocation ? "Getting location..." : "Use current location"}
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-gray-600 border-b"
                onClick={() => {
                  setSelectedLocation("All India")
                  props.setLocation("")
                  setShowLocationDropdown(false)
                }}
              >
                All India
              </div>
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedLocation(location)
                    props.setLocation(location)
                    setShowLocationDropdown(false)
                  }}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex h-12 border-2 border-black bg-white flex-1">
          <input 
            onChange={(e)=> props?.setSearch(e.target.value)} 
            placeholder="Find Cars, Mobile phones and more" 
            className="ml-3 flex-1 outline-none"
          />
          <img src={search} className="p-2"/>
        </div>
      </div>

      <div className="flex items-center space-x-4 ml-4">
        <Link to="/favorites" className="flex h-12 p-3 cursor-pointer items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </Link>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="flex h-12 p-3 cursor-pointer items-center">
              <h1 className="font-bold text-lg">{user.name}</h1>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex h-12 p-3 cursor-pointer text-red-600"
            >
              <h1 className="font-bold text-lg">Logout</h1>
            </button>
          </div>
        ) : (
          <div 
            onClick={()=> setLoginPop(!loginPop)} 
            className="flex h-12 p-3 cursor-pointer underline hover:no-underline"
          >
            <h1 className="font-bold text-lg">Login</h1>
          </div>
        )}
        
        <Link to="/sell" className="w-28 flex h-12 p-2 cursor-pointer rounded-full border border-yellow-500 justify-center">
          <h1 className="font-bold text-lg">+ SELL</h1>
        </Link>
      </div>
    </div>
    
    {loginPop && <Login setLoginPop={setLoginPop}/>}
    </>
  )
}

export default Navbar