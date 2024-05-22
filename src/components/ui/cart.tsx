
import { useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { GlobalContext } from "@/App";
import { ShoppingCartIcon } from "lucide-react";

export function Cart() {
  const context = useContext(GlobalContext);
  if (!context) throw Error("context is missing")
  const { state, handleDeleteFromCart, handleAddtoCart } = context
  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {})

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)
  // console.log("groups:", groups)
  // const keys=Object.keys(groups)
  // console.log("keys:", keys)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCartIcon className="h-6 w-6 text-gray-800 dark:text-gray-200
           transition-transform duration-300 ease-in-out hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400" />
          <span> ({Object.keys(groups).length})</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div>
          {state.cart.length === 0 && <p> No items in cart</p>}
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]
            const total = products.reduce((acc, curr) => {
              return acc + curr.price
            }, 0)
            // console.log("products:", products)
            // console.log("product:", product)
            return <div className="mb-4 flex items-center gap-4" key={product.id}>
              <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
              <h4>{product.name}</h4>
              <span className="font-bold">{total}</span>
              <Button variant="outline" onClick={() => handleDeleteFromCart(product.id)}>-</Button>
              <span className="font-bold">({products.length})</span>
              <Button variant="outline" onClick={() => handleAddtoCart(product)}>+</Button>
            </div>
          })}
        </div>
        <p>Total:{total}</p>
      </PopoverContent>
    </Popover>
  )
}