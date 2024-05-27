import { useContext } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { GlobalContext } from "@/App";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { Product } from "@/types";
import api from "@/api";
import { Link } from "react-router-dom";

type OrderItem = {
  quantity: number;
  productId: string;
};

type OrderCheckout = {
  items: OrderItem[];
};

export function Cart() {
  const context = useContext(GlobalContext);
  if (!context) throw Error("context is missing");
  const { state, handleDeleteFromCart, handleAddtoCart, handleRemoveCart } = context;

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id;
    const curGroup = acc[key] ?? [];
    return { ...acc, [key]: [...curGroup, obj] };
  }, {} as { [productId: string]: Product[] });

  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  const checkoutOrder: OrderCheckout = {
    items: []
  };

  Object.keys(groups).forEach((key) => {
    const products = groups[key];
    checkoutOrder.items.push({
      quantity: products.length,
      productId: key
    });
  });

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/Order/checkout", checkoutOrder, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 201) {
        handleRemoveCart();
      }
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCartIcon
            className="h-6 w-6 text-customColor dark:text-gray-200 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-headerColor dark:hover:text-customColor"
          />
          <span className="pt-1 font-mono"> {state.cart.length}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        {state.cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div>
            {Object.keys(groups).map((key) => {
              const products = groups[key];
              const product = products[0];
              const total = products.reduce((acc, curr) => {
                return acc + curr.price;
              }, 0);

              return (
                <div className="mb-4 flex items-center gap-4" key={product.id}>
                  <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                  <h4>{product.name}</h4>
                  <span className="font-bold">{total}</span>
                  <Button variant="outline" onClick={() => handleDeleteFromCart(product.id)}>-</Button>
                  <span className="font-bold">({products.length})</span>
                  <Button variant="outline" onClick={() => handleAddtoCart(product)}>+</Button>
                </div>
              );
            })}
            <p>Total: {total}</p>
            <Button className="bg-customColor text-button-foreground py-4 px-5 rounded-md cursor-pointer my-2 font-mono">
                        <Link to="/Checkout" className="">Checkout</Link>
                    </Button>
            {/* <Button onClick={handleCheckout}>Checkout</Button> */}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
