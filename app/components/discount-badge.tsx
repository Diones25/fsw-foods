import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, 'discountPercentage'>
}

const DiscountBadge = ({ product }:DiscountBadgeProps) => {
  return (
    <>
      <div className="gap-[2px] flex items-center bg-primary px-2 py-[2px] rounded-full text-white">
        <ArrowDownIcon size={12} />
        <span className="font-semibold text-xs">{product.discountPercentage}%</span>
      </div>
    </>
  );
}
 
export default DiscountBadge;