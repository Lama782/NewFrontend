
import { Product } from "../types"
import api from "../api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../components/ui/card"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { GlobalContext } from "@/App"
import { NavBar } from "@/components/ui/navbar"
import { Link, useSearchParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
// import Header from "@/components/ui/header"
// import { Cart } from "@/components/ui/cart"



export function Home() {
    const [searchParams, setSearchParams] = useSearchParams() 
    const defaultSearch = searchParams.get("searchBy") || ""

    const queryClient = useQueryClient()
    const [searchBy , setSearchBy]=useState(defaultSearch);
    console.log(searchBy,"search")

    const context = useContext(GlobalContext);
    if (!context) throw Error("context is missing")
    const { handleAddtoCart } = context

    const getProducts = async () => {
        try {
            const res = await api.get(`/Product?Search=${searchBy}`)
            return res.data
        } catch (error) {
            console.error(error)
            return Promise.reject(new Error("Something went wrong"))
        }
    }
    // Queries
    const { data, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchBy(value)
        
      }

      const handleSearch=(e: FormEvent)=>{
        e.preventDefault()
        queryClient.invalidateQueries({ queryKey: ["products"] })
    setSearchParams({
      ...searchParams,
      searchBy: searchBy
    })
  }

    return (
        
        <>
<NavBar/>
<div >

    <form onSubmit={handleSearch} className="flex gap-4 w-full md:w-1/2 mx-auto mb-10">
    <Input type="search" placeholder="Search for a Product"onChange={handleChange} value={searchBy}></Input>  
   <Button type="submit">Search</Button>
    </form>
          
        </div>
        {/* <Header/> */}
        <div className="App">
            {/* <h1 className="text-2xl uppercase pt-16 mb-10">DISCOVER ALULA </h1> */}
            {/* <h3>cart ({state.cart.length})</h3> */}
            <section className="flex flex-col md:flex-row gap-4 m-80 justify-between max-w-6xl mx-auto flex-wrap">
                {data?.length===0 &&<p>No product found</p>}
                {data?.map((product) => (
                    <Card key={product.id} className="w-[300px]">
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <img src={product.image} alt={product.name} className="object-cover w-full h-full"
                                height="100"
                                style={{
                                    aspectRatio: "400/500",
                                    objectFit: "cover"
                                }}
                                width="400" />
                                 <CardTitle>{product.description}</CardTitle>
                            <CardDescription>Some Description here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content Here</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleAddtoCart(product)}>Add to cart</Button>
                            <Button variant="outline" className="w-full"><Link to={`/Product/${product.name}`}>Details</Link></Button>
                        </CardFooter>
                    </Card>
                ))}
            </section>
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
        </>
    )
}
