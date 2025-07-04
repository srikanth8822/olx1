import { useState } from "react";
import { MenuProps } from "../types";

const Menubar = (props: MenuProps) => {
  const [activeCategory, setActiveCategory] = useState("");

  const categories = [
    "Cars", "Properties", "Mobiles", "Jobs", "Bikes", 
    "Electronics & Appliances", "Furniture", "Fashion", 
    "Books, Sports & Hobbies", "Pets", "Services"
  ];

  const handleCategorySelect = (category: string) => {
    props.setMenu(category);
    setActiveCategory(category);
  };

  const clearFilter = () => {
    props.setMenu("");
    setActiveCategory("");
  };

  return (
    <div className="w-full bg-white shadow-sm border-b">
      {/* Desktop View - Horizontal scrollable */}
      <div className="flex items-center p-3 space-x-2 overflow-x-auto">
        <div 
          onClick={clearFilter} 
          className={`px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 text-sm font-medium rounded transition-colors whitespace-nowrap ${activeCategory === "" ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}
        >
          All Categories
        </div>

        {categories.map((category, index) => (
          <div 
            key={index} 
            onClick={() => handleCategorySelect(category)} 
            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 text-sm font-medium rounded transition-colors whitespace-nowrap ${activeCategory === category ? "bg-blue-100 text-blue-600" : "text-gray-700"}`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menubar;