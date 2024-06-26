import CategoryList from "./components/category-list";
import Header from "./components/header";
import Search from "./components/search";
import ProductList from "./components/product-list";
import { Button } from "./components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./lib/prisma";
import PromoBanner from "./components/promo-banner";
import RestaurantList from "./components/restaurant-list";
import Link from "next/link";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList  />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizza"
        />
      </div>

      <div className="pt-6 space-y-4">
        <div className="px-5 flex items-center justify-between">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
            <Button
              variant="ghost"
              className="text-primary p-0 hover:bg-transparent h-fit"
              asChild
            >
              <Link href="/products/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="Apartir de R$ 17,90 em lanches"
        />
      </div>

      <div className="py-6 space-y-4">
        <div className="px-5 flex items-center justify-between">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
            <Button
              variant="ghost"
              className="text-primary p-0 hover:bg-transparent h-fit"
              asChild
            >
              <Link href="/restaurants/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
        </div>
        <RestaurantList />
      </div>
    </>  
  );
}
