"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface IcartContext {
  products: CartProduct[];
  addProductToCart: (product: Product, quantity: number) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductsFromCart: (productId: string) => void
}


interface Props {
  children: ReactNode
}

export const CartContext = createContext<IcartContext>({
  products: [],
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductsFromCart: () => {}
});

export const CartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          
          if (cartProduct.quantity === 1) {
            return cartProduct
          }

          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1
          }
        }

        return cartProduct;
      })
    )
  }

  const increaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1
          }
        }

        return cartProduct;
      })
    )
  }

  const addProductToCart = (product: Product, quantity: number) => {
    //Verificar se o produto já está no carrinho
    const isProductAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)
    
    //Se ele estiver aumentar sua quantidade
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {            
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }
          }

          return cartProduct;
        })
      )
    }    
    //Se não adicioná-lo com a quantidade recebida
    setProducts(prev => [...prev, { ...product, quantity: quantity}])
  }

  const removeProductsFromCart = (productId: string) => {
    return setProducts((prev) => prev.filter((product) => product.id !== productId))
  }

  return (
    <CartContext.Provider value={{ products, addProductToCart, decreaseProductQuantity, increaseProductQuantity, removeProductsFromCart }}>
      {children}
    </CartContext.Provider>
  )
}