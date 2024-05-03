"use client"

import DiscountBadge from "@/app/components/discount-badge";
import ProductList from "@/app/components/product-list";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { calculateProductTotalPrice, formatCurrency } from "@/app/helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    }
  }>[]
}

const ProductDetails = ({ product, complementaryProducts }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () => {
    setQuantity((currentState => currentState + 1));
  }

  const handleDecreaseQuantityClick = () => {
    setQuantity(currentState => currentState === 1 ? 1 : currentState - 1);
  }


  return (
    <>
      <div className="py-5 ">
        <div className="flex items-center gap-[0.375rem] px-5">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
        </div>

        <h1 className="font-semibold text-xl mb-3 mt-1 px-5">{product.name}</h1>

        <div className="flex justify-between px-5">
          {/*Preço com desconto*/}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-xl">{formatCurrency(calculateProductTotalPrice(product))}</h2>

              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {/*Preço original*/}
            {product.discountPercentage && (
              <p className="text-muted-foreground text-sm">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>

          {/*Quantidade*/}
          <div className="flex gap-3 items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button
              size="icon"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/*Dados da entrega*/}
        <div className="px-5">
          <Card className="flex justify-around py-4 mt-6">
            {/*Custo*/}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <BikeIcon size={14} />
              </div>

              {Number(product.restaurant.deliveryFree) > 0 ? (
                <p className="text-xs font-semibold">
                  {formatCurrency(Number(product.restaurant.deliveryFree))}
                </p>
              ) : (
                <p className="text-xs font-semibold">Grátis</p>
              )}
            </div>

            {/*Tempo*/}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <TimerIcon size={14} />
              </div>

              <p className="text-xs font-semibold">
                {product.restaurant.deliveryTimeMinutes} min
              </p>
            </div>
          </Card>
        </div>

        {/*Descrição*/}
        <div className="mt-6 space-y-2 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>

        {/*Sucos, depois mudar para outros produtos relacionados*/}
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold px-5">Comidas Relacionadas</h3>
          <ProductList products={complementaryProducts} />
        </div>
      </div>
    </>
  );
}
 
export default ProductDetails;