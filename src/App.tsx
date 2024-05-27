import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "./types"
import { ProductDetails } from "./pages/productDetails"
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { PrivateRout } from "./components/ui/privateRout"
import { MoreInfo } from "./pages/moreInfo"
import { Contact } from "./pages/contact"
import Checkout from "./pages/checkout"

const router = createBrowserRouter([{
  path: "/",
  element: <Home />
}, {
  path: "/login",
  element: <Login />
},
{
  path: "/signup",
  element: <Signup />
},
{
  path: "/dashboard",
  element: <PrivateRout>
    <Dashboard />
  </PrivateRout>

},
{
  path: "/Product/:name",
  element: <ProductDetails />
},
{
  path: "/moreInfo",
  element: <MoreInfo/>
},
{
  path: "/contact",
  element: <Contact/>
},
{
  path: "/checkout",
  element: <Checkout/>
}
])
type GlobalContextType = {
  state: GlobalState
  handleAddtoCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveCart:()=>void
  handleRemoveUser:()=>void
}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null

}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])
  const handleAddtoCart = (product: Product) => {
    // const isDuplicate = state.cart.find((cartItem) => cartItem.id === product.id)
    // if (isDuplicate) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
    const cart = state.cart
    const index = state.cart.findIndex(item => item.id === id)
    cart.splice(index, 1)
    // console.log('cart:', cart)
    setState({
      ...state,
      cart: cart
    })
  }


  const handleRemoveCart = () => {
    setState({
      ...state,
      cart: []
    })
  }
  
  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }

  const handleRemoveUser = () => {
    setState({
      ...state,
      user:null
    })
  }


  return (
    <div>
      <GlobalContext.Provider
        value={{ state, handleAddtoCart, handleDeleteFromCart, handleStoreUser ,handleRemoveCart, handleRemoveUser}}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
    
  )
}
export default App