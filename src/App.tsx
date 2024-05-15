import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"
import { createContext, useState } from "react"
import { Product } from "./types"


const router = createBrowserRouter([{
  path: "/",
  element: <Home />
},
{
  path: "/dashboard",
  element: <Dashboard />
}
])
type GlobalContextType={
  state:GlobalState
  handleAddtoCart:(product: Product)=>void
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
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  return (
    <div>
      <GlobalContext.Provider value={{state,handleAddtoCart}}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  )
}
export default App