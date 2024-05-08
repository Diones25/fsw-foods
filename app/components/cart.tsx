import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";


const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscounts } = useContext(CartContext);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      {/*Totais*/}
      <div className="mt-6">
        {subtotalPrice > 0 && (
          <Card>
            <CardContent className="p-5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotalPrice)}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Descontos</span>
                <span>- {formatCurrency(totalDiscounts)}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Entrega</span>
                {Number(products[0]?.restaurant.deliveryFree) === 0
                  ? <span className="uppercase text-primary">Grátis</span>
                  : formatCurrency(Number(products[0]?.restaurant.deliveryFree))}
              </div>

              <Separator />

              <div className="flex justify-between items-center text-xs font-semibold">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {subtotalPrice > 0 && (
        <Button className="w-full mt-6">Finalizar pedido</Button>
      )}
    </div>
  );
}
 
export default Cart;