import api from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function Dashboard() {
    const queryClient = useQueryClient()
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        image: ""
    })
    const handleChange = (e: any) => {
        const { name, value } = e.target
        console.log("{name,value}", { name, value })
        setProduct({
            ...product,
            [name]: value
        })
    }
    const postProduct = async () => {
        try {
            const res = await api.post("/Product", product)
            return res.data
        } catch (error) {
            console.error(error)
            return Promise.reject(new Error("Something went wrong"))
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await postProduct()
        queryClient.invalidateQueries({ queryKey: ["products"] })
    }
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
    const { data:products, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts
    })
    return (
        <>
            <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Add new product</h3>
                <Input name="name" className="mt-4" type="text" placeholder="Name" onChange={handleChange} />
                <Input name="price" className="mt-4" type="number" placeholder="Price" onChange={handleChange} />
                <Input name="image" className="mt-4" type="text" placeholder="Image" onChange={handleChange} />
                <div className="flex justify-between">
                    <Button variant="outline" className="mt-4" type="reset" >
                        Reset
                    </Button>
                    <Button className="mt-4" type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
            <div>
                <h1 className="scroll-m-20 text-4x1 my-10  tracking-tight"> Products</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">image</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="text-left">{product.name}</TableCell>
                                <TableCell className="text-left">{product.price}</TableCell>
                                <TableCell  className="text-left">{product.image}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                   
                </Table>
            </div>
        </>
    )
}