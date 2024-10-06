// src/api.js

import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Update based on your backend URL

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

export const fetchLocations = async () => {
  const response = await fetch(`${API_BASE_URL}/locations`);
  return response.json();
};

export const searchProducts = async (query:string) => {
  const response = await fetch(
    `http://127.0.0.1:8000/products/search?query=${query}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

type productType  ={
    name: string,
    supplier: string,
    description: string,
    website: string,
    category_id: number | null;
    quantity: number | null
    required_by: Date | undefined,
    location_id: number | null,
    required_for: string,
}

export const createProduct = async (product:productType) => {
  const response = await axios.post(`${API_BASE_URL}/products`,product, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getProduct = async (id:string) =>{
    const res= await axios.get(`${API_BASE_URL}/products/${id}`);

    return res.data;
}
