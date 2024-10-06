import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "@/api";
import { Button } from "@/components/ui/button";

type productType = {
  name: string;
  supplier: string;
  description: string;
  website: string;
  category_id: number | null;
  quantity: number | null;
  required_by: string;
  location_id: number | null;
  required_for: string;
};
const ProductCard = () => {
  const { id } = useParams();

  const [query, setQuery] = useState("");

  const [data, setData] = useState<productType>({
    name: "",
    supplier: "",
    description: "",
    website: "",
    category_id: 0,
    quantity: 0,
    required_by: "",
    location_id: 0,
    required_for: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) setQuery(id);
    const fetchData = async (id: string) => {
      const productData = await getProduct(id);
      setData({
        name: productData.name,
        supplier: productData.supplier,
        description: productData.description,
        website: productData.website,
        category_id: productData.category_id,
        quantity: productData.quantity,
        required_by: productData.required_by,
        location_id: productData.location_id,
        required_for: productData.required_for,
      });
    };
    fetchData(query);
  }, [id, query, setQuery]);
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Card className="w-full max-w-lg mx-auto shadow-lg border border-gray-200 rounded-lg">
        <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            {data.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {data.description || "No description available"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-gray-700 font-medium">
            <span className="font-semibold">Supplier Name:</span>{" "}
            {data.supplier}
          </p>
          <p className="text-gray-700 font-medium">
            <span className="font-semibold">Quantity:</span>{" "}
            {data.quantity || "N/A"}
          </p>
          <p className="text-gray-700 font-medium">
            <span className="font-semibold">Deadline:</span>{" "}
            {data.required_by
              ? new Date(data.required_by).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not specified"}
          </p>
          <p className="text-gray-700 font-medium">
            <span className="font-semibold">Requirement:</span>{" "}
            {data.required_for || "N/A"}
          </p>
          <p className="text-blue-600 font-medium">
            <span className="font-semibold">Website:</span>{" "}
            {data.website ? (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-800"
              >
                {data.website}
              </a>
            ) : (
              "N/A"
            )}
          </p>
        </CardContent>
        <CardFooter className="bg-gray-100 p-4 rounded-b-lg text-right">
          <Button onClick={() => navigate("/")}>Back to home</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
