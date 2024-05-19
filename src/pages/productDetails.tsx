import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Product } from "../types"
import { NavBar } from "@/components/ui/navbar"

export function ProductDetails() {
    const { name } = useParams()
    const FindProductByName = async () => {
        try {
            const res = await api.get(`Product/${name}`)
            return res.data
        } catch (error) {
            console.error(error)
            return Promise.reject(new Error("Something went wrong"))
        }
    }
    // Queries
    const { data: product, error, isLoading } = useQuery<Product>({
        queryKey: ["product"],
        queryFn: FindProductByName
    })

    console.log(product)
    if (isLoading) {
        return <p>Loading..</p>
    }

    if (!product) {
        return <p>Product not found</p>
    }
    return (
<>
<NavBar/>
        <div className="m-10">
            <img className=""
            src={product.image}
            alt={product.name}
            />
            <h1>Details</h1>
            <h3>{product.name}</h3>
            
        </div>
        </>
    )
}