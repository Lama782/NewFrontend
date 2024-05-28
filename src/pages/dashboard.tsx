
import api from "@/api"
import { Button } from "@/components/ui/button"
import { EditDialog } from "@/components/ui/editDialog"
import { Input } from "@/components/ui/input"
import { NavBar } from "@/components/ui/navbar"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Product, User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"

export function Dashboard() {
    const queryClient = useQueryClient()
    // const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        image: "",
    })
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value, valueAsNumber } = e.target
        console.log("{name,value}", { name, value })
        setProduct({
            ...product,
            [name]: name === "price" ? valueAsNumber : value,
        })
    }
    const deleteProduct = async (name: string) => {
        try {
            const res = await api.delete(`/Product/${name}`);
            return res.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error("Something went wrong"));
        }
    };
    const handleDeleteProduct = async (name: string) => {
        await deleteProduct(name);
        queryClient.invalidateQueries({ queryKey: ["products"] });
    };
    const deleteUser = async (name: string) => {
        try {
            const res = await api.delete(`/User/${name}`)
            return res.data
        } catch (error) {
            console.error(error)
            return Promise.reject(new Error("Something went wrong"))
        }
    }
    const handleDeleteUser = async (name: string) => {
        console.log(name)
        await deleteUser(name)
        queryClient.invalidateQueries({ queryKey: ["users"] })
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
    const getUsers = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await api.get("/User", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data
        } catch (error) {
            console.error(error)
            return Promise.reject(new Error("Something went wrong"))
        }
    }
    const handleSubmit = async (e: FormEvent) => {
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
    const { data: products, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn:
            async () => {
                const res = await api.get("/Product");
                return res.data;
            },
    });
    const { data: users, error: userError } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: getUsers
    })
    return (
        <>
            <NavBar />
            <div>
                <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
                    <h3 className="text-3xl font-bold text-emerald-950 font-mono text-headerColor mb-9  justify-center">Add new product</h3>
                    <Input name="name" className="mt-4" type="text" placeholder="Name" onChange={handleChange} />
                    <Input name="description" className="mt-4" type="text" placeholder="Description" onChange={handleChange} />
                    <Input name="price" className="mt-4" type="number" placeholder="Price" onChange={handleChange} />
                    <Input name="image" className="mt-4" type="text" placeholder="Image" onChange={handleChange} />
                    <div className="flex justify-between">
                        <Button variant="outline" className="mt-4" type="reset" >
                            Reset
                        </Button>
                        <Button className="mt-4 bg-customColor" type="submit" >
                            Submit
                        </Button>
                    </div>
                </form>
                <div>
                    <h1 className="text-3xl font-bold text-emerald-950 font-mono text-headerColor mb-9 mt-11 ml-11"> Products:</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]"></TableHead>
                                <TableHead className="special-text font-bold">Name</TableHead>
                                <TableHead className="special-text font-bold">Description</TableHead>
                                <TableHead className="special-text font-bold">Price</TableHead>
                                <TableHead className="special-text font-bold">image</TableHead>
                                <TableHead className="special-text font-bold">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.map((product) => {
                                console.log(product) // Log each product to inspect its structure
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell></TableCell>
                                        <TableCell className="text-left font-bold text-textColor">{product.name}</TableCell>
                                        <TableCell className="text-left font-bold text-textColor">{product.description}</TableCell>
                                        <TableCell className="text-left font-bold text-textColor">{product.price}</TableCell>
                                        <TableCell className="text-left font-bold text-textColor">{product.image}</TableCell>
                                        <TableCell>
                                            <TableCell >
                                                <Button
                                                    className="bg-customColor ml-4"
                                                    onClick={() => handleDeleteProduct(product.name)}
                                                >X
                                                </Button>
                                                <TableCell >
                                                    <EditDialog product={product} />
                                                </TableCell>
                                            </TableCell>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <div>
                        <h1 className="text-3xl font-bold text-emerald-950 font-mono text-headerColor mb-9 mt-11 ml-11">Users</h1>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-bold">Name</TableHead>
                                    <TableHead className="text-left font-bold">Email</TableHead>
                                    <TableHead className="font-bold">Role</TableHead>

                                    <TableHead className="text-right font-bold">Delete</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.map((user) => (
                                    <TableRow key={user.name}>
                                        <TableCell className="text-left font-bold text-textColor">{user.name}</TableCell>
                                        <TableCell className="text-left font-bold text-textColor">{user.email}</TableCell>
                                        <TableCell className="text-left font-bold text-textColor ">{user.role}</TableCell>
                                        <TableCell className="text-right">
                                            <Button className="bg-customColor" onClick={() => handleDeleteUser(user.email)}>
                                                X
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

        </>
    )
}