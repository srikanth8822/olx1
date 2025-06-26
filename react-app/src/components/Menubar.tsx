import { useState, useEffect } from "react";

type MenuProp = {
  setMenu: (menu: string) => void;
};

type Category = {
  _id: string;
  name: string;
  icon: string;
};

const Menubar = (props: MenuProp) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://13.200.179.78/categories");
        const result = await response.json();
        
        console.log("Categories API response:", result);
        
        if (result && result.data) {
          setCategories(result.data);
        } else {
          // Fallback categories if API doesn't return expected format
          setCategories([
            { _id: "1", name: "Cars", icon: "" },
            { _id: "2", name: "Electronics", icon: "" },
            { _id: "3", name: "Properties", icon: "" },
            { _id: "4", name: "Jobs", icon: "" },
            { _id: "5", name: "Furniture", icon: "" },
            { _id: "6", name: "Fashion", icon: "" }
          ]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback categories
        setCategories([
          { _id: "1", name: "Cars", icon: "" },
          { _id: "2", name: "Electronics", icon: "" },
          { _id: "3", name: "Properties", icon: "" },
          { _id: "4", name: "Jobs", icon: "" },
          { _id: "5", name: "Furniture", icon: "" },
          { _id: "6", name: "Fashion", icon: "" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategorySelect = (category: string) => {
    props.setMenu(category);
    setActiveCategory(category);
    setShowDropdown(false);
  };

  const clearFilter = () => {
    props.setMenu("");
    setActiveCategory("");
  };

  if (loading) {
    return (
      <div className="flex shadow-sm p-2 items-center justify-center">
        <div className="text-sm">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row shadow-sm p-2 items-start md:items-center relative space-y-2 md:space-y-0">
      {/* Categories Dropdown */}
      <div className="relative w-full md:w-auto">
        <button 
          onClick={toggleDropdown}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center w-full md:w-auto text-sm"
        >
          Categories
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {showDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 w-full md:w-48 max-h-60 overflow-y-auto">
            <div 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-blue-500 text-sm"
              onClick={clearFilter}
            >
              All Categories
            </div>
            {categories.map((category) => (
              <div 
                key={category._id} 
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${activeCategory === category.name ? 'bg-gray-100 font-medium' : ''}`}
                onClick={() => handleCategorySelect(category.name)}
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Pills - Horizontal scroll on mobile */}
      <div className="flex overflow-x-auto space-x-2 md:space-x-4 w-full md:flex-1 pb-2 md:pb-0">
        {/* "All" option */}
        <div 
          onClick={clearFilter} 
          className={`flex-shrink-0 px-3 py-1 cursor-pointer hover:text-blue-500 text-sm whitespace-nowrap ${activeCategory === "" ? "font-medium text-blue-500 bg-blue-50 rounded" : ""}`}
        >
          All
        </div>

        {/* Category pills */}
        {categories.slice(0, 8).map((category) => (
          <div 
            key={category._id} 
            onClick={() => handleCategorySelect(category.name)} 
            className={`flex-shrink-0 px-3 py-1 cursor-pointer hover:text-blue-500 text-sm whitespace-nowrap ${activeCategory === category.name ? "font-medium text-blue-500 bg-blue-50 rounded" : ""}`}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menubar;