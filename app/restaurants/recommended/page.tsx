import Header from "@/app/components/header";
import RestaurantItem from "@/app/components/restaurant-item";
import RestaurantList from "@/app/components/restaurant-list";
import { db } from "@/app/lib/prisma";

const RecomendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({})

  return (
    <>
      <Header />      
      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold">Restaurantes Recomendados</h2>
        <div className="mt-5">
          {restaurants.map(restaurant => (
            <div className="mb-3">
              <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
 
export default RecomendedRestaurants;