"use client"

import { Button } from "@/app/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  }

  return (
    <>
      <div className="relative w-full h-[250px]">
        <Image
          src={restaurant?.imageUrl}
          alt={restaurant?.name}
          fill
          className="object-cover"
        />

        <Button
          className="absolute top-4 left-4 rounded-full bg-slate-200 text-foreground hover:text-white"
          size="icon"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Button size="icon" className="absolute top-4 right-4 bg-[#323232] rounded-full">
          <HeartIcon size={20} className="fill-white" />
        </Button>
      </div>
    </>
  );
}

export default RestaurantImage;