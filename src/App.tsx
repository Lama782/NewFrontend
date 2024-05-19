import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"
import { ProductDetails } from "./pages/productDetails"


const router = createBrowserRouter([{
  path: "/",
  element: <Home />
},
{
  path: "/dashboard",
  element: <Dashboard />
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

}
type GlobalState = {
  cart: Product[]
}
export const GlobalContext = createContext<GlobalContextType | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })


  const handleAddtoCart = (product: Product) => {
    const isDuplicate = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicate) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart=(id:string)=>{
    const filteredCart=state.cart.filter(item=> item.id!==id)
    setState({
      ...state,
      cart:filteredCart
    })

  }

  return (
    <div>
      <GlobalContext.Provider value={{ state, handleAddtoCart, handleDeleteFromCart }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}
export default App