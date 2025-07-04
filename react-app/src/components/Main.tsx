import { useEffect, useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"
import { Product } from "../types"

const Main = () => {
    const [adPosts, setAdPosts] = useState<Product[]>([])
    const [search, setSearch] = useState("")
    const [menu, setMenu] = useState("")
    const [location, setLocation] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAds = async () => {
            try {
                setLoading(true)
                console.log("Fetching ads...")
                
                const response = await fetch('http://13.200.179.78/adposts');
                const result = await response.json();
                const products = result.data || result || [];
                setAdPosts(products);
                
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