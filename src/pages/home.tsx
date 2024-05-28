import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Product } from "../types";
import api from "../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { GlobalContext } from "@/App";
import { NavBar } from "@/components/ui/navbar";
import { Link, useSearchParams } from "react-router-dom";
import "../App.css"; // Import the CSS file
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from "@/components/ui/footer";
export function Home() {
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
        <>
            <NavBar />
            <div className="hero-section">
                <div className="third-slide"></div>
                <div className="hero-overlay">
                    <h1 className="hero">Discover AlUla</h1>
                </div>
            </div>
            <div className="second-section">
                <div className="text-content">
                    <h1 className="text-5xl font-bold text-emerald-950 font-mono text-headerColor">Explore the Wonders of AlUla</h1>
                    <br />
                    <br />
                    <p className="font-sans text-xl text-textColor">
                        Discover the hidden gems and breathtaking landscapes of AlUla. From the majestic Elephant Rock to the historic ruins of ancient civilizations, AlUla offers a unique blend of natural beauty and cultural heritage. Nestled in the heart of the Arabian Peninsula, AlUla is home to some of the most stunning and diverse landscapes in the world. Visitors can marvel at dramatic sandstone mountains, vast desert expanses, and lush oases. AlUlas rich history is evident in the ancient city of Hegra, Saudi Arabias first UNESCO World Heritage Site.
                    </p>
                    <br />
                    <br />
                    <div className="flex justify-end">
                    <Button className="bg-customColor text-button-foreground py-4 px-4 rounded-md cursor-pointer my-2 ">
                        <Link to="/moreInfo" className=" bg-customColor text-button-foreground py-2 px-4 rounded-md cursor-pointer my-2">Explore More</Link>
                    </Button>
                    </div>
                </div>
                <img
                    src="https://s7g10.scene7.com/is/image/rcu/elephant-rock-place-to-go-hero-01?$Responsive$&fit=stretch&fmt=webp&wid=1440"
                    alt="Description of Image"
                    className="your-custom-class"
                />
            </div>
            <div className="max-w-[1400px] m-auto py-16 px-4 grid lg:grid-cols-2 gap-4">
                <div className="grid grid-cols-3 grid-rows-7 h-[100vh]">

                    <img className="row-span-3 object-cover w-full h-full p-2" src="https://img.freepik.com/free-photo/beautiful-scenery-delicate-arch-arches-national-park-utah-usa_181624-43226.jpg?t=st=1716754212~exp=1716757812~hmac=f2225a6a2ef30ffbf158dac1c3aa130f23fc2337be34ee108a5a856cf8aa35de&w=360" />
                    <img className="row-span-3 object-cover w-full h-full p-2" src="https://cloudfront-eu-central-1.images.arcpublishing.com/thenational/6WMTMMGRMVGF7C5JKRVMZ7QUIQ.jpg" />
                    <img className="row-span-2 object-cover w-full h-full p-2" src="https://th-thumbnailer.cdn-si-edu.com/P22jRtZ3G2zhfqpAKzmaeOPtD0M=/fit-in/1072x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/ac/c8/acc8da5d-e0e0-4267-a1c0-77f11667ee94/hegra_1.jpeg" />
                    <img className="row-span-3 object-cover w-full h-full p-2" src="https://s7g10.scene7.com/is/image/rcu/banyan-tree-accommodationstack-08?$Responsive$&fit=stretch&fmt=webp&wid=1440" />
                    <img className="row-span-2 object-cover w-full h-full p-2" src="https://media.cntraveler.com/photos/642b28a95e21b50e5b47c370/master/pass/Banyan%20Tree%20AlUla%20_LEDE%20%20MND_7247(2).jpg" />
                    <img className=" row-span-2 object-cover w-full h-full p-2" src="https://s7g10.scene7.com/is/image/rcu/banyan-tree-accommodationstack-09?$Responsive$&fit=stretch&fmt=webp&wid=1440" />
                </div>
                <div className="  flex flex-col h-full justify-center">
                    <h3 className="text-5xl md:text-5xl   font-bold text-emerald-950 font-mono text-headerColor "> Worlds Largest Living Museum!</h3>
                    <p className="text-2xl py-6 text-textColor">Take a journey through time in the worlds largest living museum.
                        AlUla stands with two other great oases in northwest Arabia to create a place of profound history that is continuously evolving. Its strategic position has, throughout millenia, made it a crucial hub for trade, and its distinct geographical features, such as the famed oasis and imposing sandstone mountains, combined with its favourable climate, allowed numerous civilisations to thrive. Those who visit now embark on an authentic journey, travelling back in time, surrounded by wonders and a sense of discovery.</p>

                </div>
            </div>

            <Footer />
        </>


    );
}