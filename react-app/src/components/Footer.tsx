const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 sm:p-6 mt-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3">Popular Categories</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="hover:text-blue-400 cursor-pointer">Cars</li>
              <li className="hover:text-blue-400 cursor-pointer">Mobile Phones</li>
              <li className="hover:text-blue-400 cursor-pointer">Properties</li>
              <li className="hover:text-blue-400 cursor-pointer">Jobs</li>
              <li className="hover:text-blue-400 cursor-pointer">Electronics</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3">About Us</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="hover:text-blue-400 cursor-pointer">About OLX Clone</li>
              <li className="hover:text-blue-400 cursor-pointer">Careers</li>
              <li className="hover:text-blue-400 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-400 cursor-pointer">Terms of Use</li>
              <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3">Help & Support</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="hover:text-blue-400 cursor-pointer">Help Center</li>
              <li className="hover:text-blue-400 cursor-pointer">Safety Tips</li>
              <li className="hover:text-blue-400 cursor-pointer">Customer Support</li>
              <li className="hover:text-blue-400 cursor-pointer">FAQs</li>
              <li className="hover:text-blue-400 cursor-pointer">Report a Problem</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3">Follow Us</h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm sm:text-base">
              <a href="#" className="hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-400">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} OLX Clone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;