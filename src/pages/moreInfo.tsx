// import { NavBar } from "@/components/ui/navbar";

import { GlobalContext } from "@/App";
import api from "@/api";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/ui/navbar";
import { Product } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export function MoreInfo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultSearch = searchParams.get("searchBy") || "";

    const queryClient = useQueryClient();
    const [searchBy, setSearchBy] = useState(defaultSearch);
    const context = useContext(GlobalContext);
    if (!context) throw Error("context is missing");
    const { handleAddtoCart } = context;

    const getProducts = async () => {
        try {
            const res = await api.get(`/Product?Search=${searchBy}`);
            return res.data;
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error("Something went wrong"));
        }
    };

    const { data, error } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchBy(value);
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setSearchParams({
            ...searchParams,
            searchBy: searchBy
        });
    };

    return (
        <div>
            <NavBar />
            <div className="moreInfo">
                <div className="search-section flex justify-center my-6">
                    <form onSubmit={handleSearch} className="search-form flex items-center space-x-2">
                        <Input
                            type="search"
                            placeholder="Search for a Product"
                            onChange={handleChange}
                            value={searchBy}
                            className="px-6 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <Button type="submit" className="px-3 py-1 bg-customColor text-white rounded-md shadow-sm hover:bg-headerColor focus:outline-none focus:ring-2 focus:ring-blue-300">
                            Search
                        </Button>
                    </form>
                </div></div>
            <h1 className=" text-customColor flex text-3xl font-bold text-emerald-950 ml-40 mb-9 ">Places to go and Things to do in AlUla:</h1>
            <div className="products-section">

                {data?.length === 0 && <p>No products found</p>}
                {data?.map((product) => (
                    <Card key={product.id} className=" product-card">
                        <CardHeader>
                            <CardTitle className="text-customColor mb-5">{product.name}</CardTitle>
                            <img src={product.image} alt={product.name} />
                            <CardDescription className="text-textColor mb-5 mt-5">{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-customColor mb-5">Start From {product.price}</p>
                        </CardContent>

                        <CardFooter className="flex gap-4">
                           
                            <Button className="bg-customColor text-button-foreground py-4 px-5 rounded-md cursor-pointer my-2" onClick={() => handleAddtoCart(product)}>Add to cart</Button>
                            <Button variant="outline" className="bg-customColor text-button-foreground py-4 px-5 rounded-md cursor-pointer my-2 w-full">
                                <Link to={`/Product/${product.name}`}> Learn More </Link>
                            </Button>
                            
                        </CardFooter>
                    </Card>

                ))}
                {error && <p className="text-red-500">{error.message}</p>}
            </div>
            <br />
            <br />
            <Footer />
        </div>
    )
}