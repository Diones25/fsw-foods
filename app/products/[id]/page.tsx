import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./components/product-image";
import ProductDetails from "./components/product-details";

interface ProductsPageProps {
  params: {
    id: string
  }
}

const ProductsPage = async ({ params: { id } }: ProductsPageProps) => {

  const product = await db.product.findUnique({
    where: {
      id
    },
    include: {
      restaurant: true,
      category: true
    }
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: product?.category.name 
      },
      restaurant: {
        id: product?.restaurantId
      }
    },
    include: {
      restaurant: true
    }
  })

  if (!product) {
    return notFound();
  }

  return (
    <>
      <div>
        <ProductImage product={product}/>

        <ProductDetails product={product} complementaryProducts={juices} />
      </div>
    </>
  );
}
 
export default ProductsPage;