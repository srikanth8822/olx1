import olx from "../assets/olx.png"
import lens from "../assets/lens.png"
import arrow from "../assets/arrow.png"
import search from "../assets/search.png"
import Login from "./Login"
import { useState, useEffect } from "react"

type NavbarProps = {
  setSearch: any;
  setLocation: (location: string) => void;
}

const Navbar = (props: NavbarProps) => {
  const [loginPop, setLoginPop] = useState(false)
  const [locations, setLocations] = useState<string[]>([])
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Location")

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://13.200.179.78/adposts")
        const result = await response.json()
        if (result.data) {
          const uniqueLocations = [...new Set(
            result.data
              .map((item: any) => item.city || item.location)
              .filter(Boolean)
          )]
          setLocations(uniqueLocations)
        }
      } catch (error) {
        console.error("Error fetching locations:", error)
      }
    }

    fetchLocations()
  }, [])

  return (
    <>
    {/* Mobile View */}
    <div className="md:hidden">
      {/* Top Row - Logo and Login/Sell */}
      <div className="flex justify-between items-center p-3 bg-slate-100">
        <img src={olx} className="w-11 h-9"/>
        <div className="flex items-center space-x-3">
          <div 
            onClick={()=> setLoginPop(!loginPop)} 
            className="text-sm font-semibold text-gray-700"
          >
            Login
          </div>
          <div className="bg-yellow-400 px-3 py-1 rounded-full">
            <span className="text-xs font-bold">SELL</span>
          </div>
        </div>
      </div>
      
      {/* Location Bar */}
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
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer font-medium text-blue-500 border-b"
              onClick={() => {
                setSelectedLocation("All Locations")
                props.setLocation("")
                setShowLocationDropdown(false)
              }}
            >
              All Locations
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
      
      {/* Search Bar */}
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
      <img src={olx} className="w-11 h-9"/>
      
      <div className="flex space-x-4 ml-5 flex-1">
        {/* Location Dropdown */}
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
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-blue-500"
                onClick={() => {
                  setSelectedLocation("All Locations")
                  props.setLocation("")
                  setShowLocationDropdown(false)
                }}
              >
                All Locations
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

        {/* Search Bar */}
        <div className="flex h-12 border-2 border-black bg-white flex-1">
          <input 
            onChange={(e)=> props?.setSearch(e.target.value)} 
            placeholder="Find Cars, Mobile phones and more" 
            className="ml-3 flex-1 outline-none"
          />
          <img src={search} className="p-2"/>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center space-x-4 ml-4">
        <div className="flex h-12 p-3 cursor-pointer">
          <h1 className="font-semibold">ENGLISH</h1>
          <img src={arrow} className="w-8 h-7"/>
        </div>
        
        <div 
          onClick={()=> setLoginPop(!loginPop)} 
          className="flex h-12 p-3 cursor-pointer underline hover:no-underline"
        >
          <h1 className="font-bold text-lg">Login</h1>
        </div>
        
        <div className="w-28 flex h-12 p-2 cursor-pointer rounded-full border border-yellow-500 justify-center">
          <h1 className="font-bold text-lg">+ SELL</h1>
        </div>
      </div>
    </div>
    
    {loginPop && <Login setLoginPop={setLoginPop}/>}
    </>
  )
}

export default Navbar