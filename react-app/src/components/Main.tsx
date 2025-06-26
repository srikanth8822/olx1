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

    const getAdPosts = async () => {
        try {
            const response = await fetch('http://13.200.179.78/adposts')
            const result = await response.json()
            if (result.data) {
                setAdPosts(result.data)
            }
        } catch (error) {
            console.error("Error fetching ad posts:", error)
        }
    }

    useEffect(() => {
        getAdPosts()
    }, [])

    return (
        <div>
            <Navbar setSearch={setSearch} setLocation={setLocation} />
            <Menubar setMenu={setMenu} />
            <Home products={adPosts} search={search} menu={menu} location={location} />
            <Footer />
        </div>
    )
}

export default Main
