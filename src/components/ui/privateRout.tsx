import { ReactElement, useEffect } from "react"
import jwt from "jwt-decode"
import { ROLE } from "@/types"
import { Login } from "@/pages/login"
import { Navigate } from "react-router-dom"
import { reshapeUser } from "@/lib/utils"

export function PrivateRout({ children }: {children: ReactElement}){
    console.log("GLOBAL DATA")
    const token = localStorage.getItem("token") || ""
    if (!token) return <Navigate to="/" />
    const decodedToken = jwt(token)
    
    const decodedUser = reshapeUser(decodedToken)
 
    return decodedUser.role === ROLE.Customer?<Navigate to= "/"/> :children
}
