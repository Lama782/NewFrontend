import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
    const navigate = useNavigate()
const [user,setUser]=useState({
    name: "",
    email: "",
    password: ""
})
console.log("user:",user)    
    const handleSignup = async () => {
        try {
            const res = await api.post(`/User/signup`, user)
            return res.data
        } catch (error) {
            console.error(error)
            return Promise.reject(new Error("Something went wrong"))
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name,value}= e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSubmit=async (e: FormEvent)=>{
        e.preventDefault()
        const response= await handleSignup()
        console.log("response:", response)
        if (response) {
            navigate("/login")
          }
        
    }
    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center ">
            <h1 className="text-5xl font-bold text-emerald-950 font-mono text-headerColor mt-12">SIGNUP</h1>
            </div>
            <form action="POST"  onSubmit ={handleSubmit}className="md:w-1/2 w-full mx-auto  ">
            <Input name="name"
                    className="mt-4"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange} />
                <Input name="email"
                    className="mt-4"
                    type="text"
                    placeholder="Email"
                    onChange={handleChange} />
                <Input name="password"
                    className="mt-4"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}/>
                <div className="flex justify-between flex-col">
                    <Button className="bg-customColor text-button-foreground py-2 px-4 rounded-md cursor-pointer my-2 mx-auto mt-12">Signup</Button>
                    <Link to="/login">
                        <Button variant="link" className="mt-4">Have an account already?</Button>
                    </Link>

                </div>
            </form>

        </div>
    )
}