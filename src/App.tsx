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
}
])
type GlobalContextType = {
  state: GlobalState
  handleAddtoCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
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
  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }
  return (
    <div>
      <GlobalContext.Provider
        value={{ state, handleAddtoCart, handleDeleteFromCart, handleStoreUser }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
    
  )
}
export default App