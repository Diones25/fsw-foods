"use client"

import { Restaurant } from '@prisma/client';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchForRestaurant } from './actions/search';
import Header from '../components/header';
import RestaurantItem from '../components/restaurant-item';

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    {/*Abaixo uma função que é criada e executado ao mesmo tempo*/}
    (async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return
      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants)
    })() 

  }, [searchFor])

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold">Restaurantes Encontrados</h2>
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
 
export default Restaurants;