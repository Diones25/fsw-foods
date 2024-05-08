import Image from "next/image";
import { CartContext, CartProduct } from "../contexts/cart";
import { calculateProductTotalPrice, formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProductsFromCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id)
  }

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(cartProduct.id)
  }

  const handleRemoveProduct = () => {
    removeProductsFromCart(cartProduct.id);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 relative">
            <Image
              src={cartProduct.imageUrl}
              alt={cartProduct.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-xs">{cartProduct.name}</h3>

            <div className="flex items-center gap-1">
              <h4 className="text-sm font-semibold">
                {formatCurrency(calculateProductTotalPrice(cartProduct) * cartProduct.quantity)}
              </h4>
              {cartProduct.discountPercentage > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)}
                </span>
              )}
            </div>

            {/*Quantidade*/}
            <div className="flex gap-3 items-center text-center">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 border border-solid border-muted-foreground"

              >
                <ChevronLeftIcon size={18} onClick={handleDecreaseQuantityClick} />
              </Button>
              <span className="w-5 text-sm">{cartProduct.quantity}</span>
              <Button
                size="icon"
                className="h-8 w-8"
              >
                <ChevronRightIcon size={18} onClick={handleIncreaseQuantityClick} />
              </Button>
            </div>            
          </div>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 border border-solid border-muted-foreground"
          onClick={handleRemoveProduct}
        >
          <TrashIcon size={18} />
        </Button>
      </div>
    </>
  );
}
 
export default CartItem;