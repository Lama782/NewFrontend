
import { useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { GlobalContext } from "@/App";
import { ShoppingCartIcon } from "lucide-react";

export function Cart() {
  const context = useContext(GlobalContext);
  if (!context) throw Error("context is missing")
  const { state, handleDeleteFromCart } = context
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCartIcon className="h-6 w-6 text-gray-800 dark:text-gray-200
           transition-transform duration-300 ease-in-out hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400" />
          <span> ({state.cart.length})</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          {state.cart.length === 0 && <p> No items in cart</p>}
          {state.cart.map((product) => {
            return <div className="mb-4 flex items-center gap-4" key={product.id}>
              <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
              <h4>{product.name}</h4>
              <span className="font-bold">{product.price}</span>
              <Button onClick={() => handleDeleteFromCart(product.id)}>X</Button>
            </div>
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}