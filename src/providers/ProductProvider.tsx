import React, { createContext } from "react";
import { useLocalState } from "../hooks/custom/useLocalState";
import { ProductSchema } from "../views/App/Products/Products";

type ProductContextType = {
  products: ProductSchema[];
  addProduct: (Product: ProductSchema) => void;
  editProduct: (Product: ProductSchema) => void;
  getProduct: (plate: string) => ProductSchema;
};

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

type ProductProviderProps = React.PropsWithChildren<unknown>;

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useLocalState<ProductSchema[]>(
    "@products",
    []
  );

  const addProduct = (Product: ProductSchema) => {
    setProducts((p) => [...p, Product]);
  };

  const editProduct = (Product: ProductSchema) => {
    setProducts((prev) =>
      prev.map((p) => (p.name === Product.name ? { ...p, ...Product } : p))
    );
  };

  const getProduct = (name: string) => {
    return products.find((Product) => Product.name === name) || {} as ProductSchema;
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, editProduct, getProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
