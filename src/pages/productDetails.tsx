import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { Product } from "../types"
import { NavBar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { GlobalContext } from "@/App"
import { useContext } from "react"

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





    return (

//         <>
//             <NavBar />
//             <div className="details-page">
//                 <div className="details-container">
//                     <img src={product.image} alt={product.name} />
//                     <div className="details-content">
//                         {/* <h1 className="details-title">Details</h1> */}
//                         <h3 className="product-name">{product.name}</h3>
//                         <p className="card-description">{product.description}</p>
//                         <p className="price">Price: {product.price}</p>
//                         <div className="my-4">
//                         <Link to="/moreInfo" className="bg-customColor text-button-foreground py-3 px-4 rounded-md cursor-pointer my-2 mb-4">Back to Products</Link>
//                         <Button className="bg-customColor text-button-foreground py-4 px-5 rounded-md cursor-pointer my-2" onClick={() => handleAddtoCart(product)}>Add to cart</Button>
//                     </div></div>
//                 </div>
//             </div>
//         </>
//     );
// }
<>
            <NavBar />
            <div className="details-page">
                <div className="details-container">
                    <img src={product.image} alt={product.name} />
                    <div className="details-content">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="card-description">{product.description}</p>
                        <p className="price"> {product.price} /SR per person</p>
                        <div className="buttons-container py-1">
                            <Link to="/moreInfo" className="button">
                                Back to Products
                            </Link>
                            <Button
                                className="mx-3 bg-customColor buttons-container py-1"
                                onClick={() => handleAddtoCart(product)}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}





