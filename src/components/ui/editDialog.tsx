import api from "@/api"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Product } from "@/types"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, } from "@radix-ui/react-dialog"

import { Label } from "@radix-ui/react-label"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"


export function EditDialog({ product }: { product: Product }) {
  const queryClient = useQueryClient()
  const [updatedProduct, setUpdateProduct] = useState(product)

  const updateProduct = async () => {
    try {
      const res = await api.patch(`/Product/${product.name}`, updatedProduct);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };
  console.log('updatedProduct', updatedProduct)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setUpdateProduct({
      ...updatedProduct,
      name: value
    })
  }
  const handleUpdate = async () => {
    // await updateProduct()
    // queryClient.invalidateQueries({ queryKey: ["products"] })
    try {
      const updatedData = await updateProduct();
      setUpdateProduct(updatedData);
      queryClient.invalidateQueries({ queryKey: ["products"] });
     
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {/* <DialogHeader> */}
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>

        </DialogDescription>
        {/* </DialogHeader> */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={updatedProduct.name}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>

        </div>
        {/* <DialogFooter> */}
        <Button type="submit" onClick={handleUpdate}>Save changes</Button>
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
