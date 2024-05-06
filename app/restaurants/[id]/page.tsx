import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/components/delivery-info";
import ProductList from "@/app/components/product-list";

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({ params:{id} }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id
    },
    include: {
      categories: {
        orderBy: {
          name: 'desc'
        },
        include: {
          Products: {
            where: {
              restaurantId: id
            },
            include: {
              restaurant: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
      Products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <div>
        <RestaurantImage restaurant={restaurant} /> 

        <div className="flex justify-between items-center px-5 pt-5 relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white">
          {/*Titulo*/}
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold">{ restaurant.name }</h1>
          </div>

          <div className="gap-[3px] flex items-center px-2 py-[5px] rounded-full bg-foreground text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-xs">
              5.0
            </span>
          </div>
        </div>

        <div className="px-5">
          <DeliveryInfo restaurant={restaurant} />
        </div>

        <div className="px-5 mt-3">
          <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {restaurant.categories.map(category => (
              <div key={category.id} className="bg-[#f4f4f4] min-w-[167px] rounded-lg text-center">
                <span className="text-muted-foreground text-xs">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {/*Mostrar produtos mais pedidos quando implementarmos realização de pedidos*/}
          <h2 className="font-semibold px-5">Mais pedidos</h2>
          <ProductList products={restaurant.Products} />
        </div>

        {restaurant.categories.map(category => (
          <div className="mt-6 space-y-4" key={category.id}>            
            <h2 className="font-semibold px-5">{ category.name }</h2>
            <ProductList products={category.Products} />
          </div>
        ))}
      </div>
    </>
  );
}
 
export default RestaurantPage;