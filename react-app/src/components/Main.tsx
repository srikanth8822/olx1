import { useEffect, useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"

const Main = () => {
    const [adPosts, setAdPosts] = useState([])
    const [search, setSearch] = useState("")
    const [menu, setMenu] = useState("")
    const [location, setLocation] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAds = async () => {
            try {
                setLoading(true)
                console.log("Fetching ads...")
                
                // Get user posted products from localStorage
                const userProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
                console.log("User products:", userProducts.length);
                
                // Try to get API products
                let apiProducts = [];
                try {
                    const response = await fetch('http://13.200.179.78/adposts');
                    const result = await response.json();
                    if (result.data && Array.isArray(result.data)) {
                        apiProducts = result.data;
                        console.log("API products:", apiProducts.length);
                    }
                } catch (error) {
                    console.log("API failed, using fallback");
                    // Fallback products
                    apiProducts = [
                        {
                            _id: "api1",
                            title: "iPhone 13 Pro Max",
                            price: 85000,
                            category: "Mobiles",
                            location: "Mumbai",
                            thumb: null,
                            description: "Excellent condition iPhone",
                            seller_name: "John Doe"
                        },
                        {
                            _id: "api2", 
                            title: "Honda City",
                            price: 1200000,
                            category: "Cars",
                            location: "Delhi",
                            thumb: null,
                            description: "Well maintained car",
                            seller_name: "Jane Smith"
                        }
                    ];
                }
                
                // Combine user products with API products (user products first)
                const allProducts = [...userProducts, ...apiProducts];
                setAdPosts(allProducts);
                console.log("Total products:", allProducts.length);
                
            } catch (error) {
                console.error("Error fetching ads:", error)
                setAdPosts([])
            } finally {
                setLoading(false)
            }
        }

        fetchAds()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl">Loading ads...</div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen">
            <Navbar setSearch={setSearch} setLocation={setLocation} />
            <Menubar setMenu={setMenu} />
            <Home products={adPosts} search={search} menu={menu} location={location} />
            <Footer />
        </div>
    )
}

export default Main