import Header from "@/app/components/header";
import ProductItem from "@/app/components/product-item";
import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  }
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id: id
    },
    include: {
      Products: {
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

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold">{ category.name }</h2>
        <div className="grid grid-cols-2 gap-6">
          {category?.Products.map(product => (
            <div className="mb-3">
              <ProductItem key={product.id} product={product} className="min-w-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
 
export default CategoriesPage;