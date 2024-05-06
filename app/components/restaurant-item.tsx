import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantProps {
  restaurant: Restaurant
}

const RestaurantItem = ({ restaurant }:RestaurantProps) => {
  return (
    <Link className="min-w-[266px] max-w-[266px] " href={`/restaurants/${restaurant.id}`}>
      <div className="w-full space-y-3">
        <div className="w-full h-[136px] relative">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover rounded-lg"
          />

          <div className="absolute top-2 left-2 gap-[2px] flex items-center bg-primary px-2 py-[5px] rounded-full bg-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-xs">
              5.0
            </span>
          </div>

          <Button size="icon" className="absolute top-2 right-2 w-8 h-8 bg-[#323232] rounded-full">
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">{Number(restaurant.deliveryFree) === 0 ? "Entrega Grátis" : formatCurrency(Number(restaurant.deliveryFree))}</span>
            </div>

            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">{restaurant.deliveryTimeMinutes} min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
 
export default RestaurantItem;