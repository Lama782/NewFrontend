import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "@/App";
import jwt from "jwt-decode"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reshapeUser } from "@/lib/utils";
import api from "@/api";

export function Login() {
    const navigate = useNavigate()
    const context = useContext(GlobalContext);
    if (!context) throw Error("context is missing")
    const { handleStoreUser } = context

    const [user, setUser] = useState({

        email: "",
        password: ""
    })

    const handleLogin = async () => {
        try {
            const res = await api.post(`/User/login`, user)
            return res.data
        } catch (error) {
            console.error(error)
            return Promise.reject(new Error("Something went wrong"))
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser({
            ...user,
            [name]: value
        })

    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const token = await handleLogin()
        if (token) {
            
            const decodedToken = jwt(token)
            const user = reshapeUser(decodedToken)
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            handleStoreUser(user)
            navigate("/")
        }
    }
    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center ">
  <h1 className="text-5xl font-bold text-emerald-950 font-mono text-headerColor">LOGIN</h1>
</div>
            {/* <h1 className="text-5xl font-bold text-emerald-950 font-mono text-headerColor">LOGIN </h1> */}
            <form action="post" className="md:w-1/2 w-full mx-auto " onSubmit={handleSubmit}>
                <Input name="email"
                    className="mt-4"
                    type="text"
                    placeholder="Email"
                    onChange={handleChange} />
                <Input name="password"
                    className="mt-4"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <div className="flex justify-between flex-col">
                    <Button className="bg-customColor text-button-foreground py-4 px-5 rounded-md cursor-pointer my-2">Login</Button>
                    <Link to="/signup">
                        <Button variant="link" className="mt-4">create an account</Button>
                    </Link>
                </div>
            </form>

        </div>
    )
}