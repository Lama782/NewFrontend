
import { Product } from "../types"
import api from "../api"


import { useQuery } from "@tanstack/react-query"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card"

export function Home() {
 
  const getProducts = async () => {
    try {
      const res = await api.get("/Product")
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
  
  return (
    <div className="App">
      <h1 className="text-2xl uppercase mb-10">DISCOVER THE WORLD</h1>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
             
              
              <img src={product.image} alt={product.name}  className="object-cover w-full h-full"
                height="100"
                style={{
                  aspectRatio: "400/500",
                  objectFit: "cover"
                }}
                width="400" />


              <CardDescription>Some Description here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content Here</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}
