import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { Product } from "../types"
import { NavBar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { GlobalContext } from "@/App"
import { useContext } from "react"

import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/ui/footer"

export function ProductDetails() {

    const context = useContext(GlobalContext);
    if (!context) throw Error("context is missing");

    const { handleAddtoCart } = context;

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
//     return (
//         <>
//             <NavBar />
//             <div className="details-page">
//                 <div className="details-container">
//                     <img src={product.image} alt={product.name} />
//                     <div className="details-content">
//                         <h3 className="product-name">{product.name}</h3>
//                         <p className="card-description">{product.description}</p>
//                         <p className="price"> {product.price} /SR per person</p>
//                         <div className="buttons-container py-1">
//                             <Link to="/moreInfo" className="button">
//                                 Back to Products
//                             </Link>
//                             <Button
//                                 className="mx-3 bg-customColor buttons-container py-1"
//                                 onClick={() => handleAddtoCart(product)}
//                             >
//                                 Add to Cart
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer/>
//         </>
//     );
// }
// 


return (
    <>
        <NavBar/>
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row md:space-x-8 items-start">
                <div className="w-full md:w-1/2">
                    <img className="w-full h-auto object-cover" src={product.image} alt={product.name} />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-2xl font-bold">{product.name}</h3>
                        <p className="text-lg">{product.description}</p>
                        <p className="text-xl font-semibold"> {product.price} SR per person</p>
                    </div>
                    <div className="flex justify-between items-end">
                        <div> {/* Empty div for spacing */} </div>
                        <div className="flex space-x-4">
                            <Link to="/moreInfo" className="p-2 bg-customColor text-white rounded-full hover:bg-headerColor">
                                <ArrowLeft size={24} />
                            </Link>
                            <Button
                                className="px-4 py-2 bg-customColor text-white rounded-md hover:bg-headerColor"
                                onClick={() => handleAddtoCart(product)}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
);
}