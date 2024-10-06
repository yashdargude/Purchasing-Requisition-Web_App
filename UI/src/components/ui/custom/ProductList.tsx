// src/components/ProductList.jsx

import React, { FC, useEffect, useState } from "react";
import { searchProducts } from "@/api"; // Assuming you have this function in `api.js`

type prodType = {
    id:string,
    name:string,
    supplier:string,
}

interface prodList{
    query: string;
}

const ProductList:FC<prodList> = ({ query }) => {
  const [products, setProducts] = useState<prodType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.length > 0) {
        try {
          const results = await searchProducts(query);
          setProducts(results);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      } else {
        setProducts([]); // Clear products if the search query is empty
      }
    };
    fetchProducts();
  }, [query]); // Re-fetch products whenever the query changes

  return (
    <div className="p-4">
      <h2 className="text-lg mb-4">Product List</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className="border-b py-2">
              {product.name} - {product.supplier}
            </li>
          ))
        ) : (
          <li>No products found.</li>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
