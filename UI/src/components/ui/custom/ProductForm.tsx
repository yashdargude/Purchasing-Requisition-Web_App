// src/components/ProductForm.jsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { toast } from "sonner";

import React, { useState, useEffect, FormEvent } from "react";
import { fetchCategories, fetchLocations, createProduct } from "@/api";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [category_id, setCategoryId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [required_by, setRequiredBy] = useState<Date | undefined>(new Date());
  const [location_id, setLocationId] = useState<number | null>(null);
  const [required_for, setRequiredFor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      const locationsData = await fetchLocations();
      setCategories(categoriesData);
      setLocations(locationsData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      supplier,
      description,
      website,
      category_id,
      quantity,
      required_by,
      location_id,
      required_for,
    };
    console.log(formData);
    const result = await createProduct(formData);
    if (result) {
      toast.success("success");
    }
  };

  return (
    <div className="grid place-items-center w-full h-screen">
      <Card className="border border-2 border-gray-200 w-1/2">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Add product</CardTitle>
          <CardDescription>Enter product details</CardDescription>
        </CardHeader>
        <form className="p-4" onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 mb-4 w-full"
            />
            <Input
              type="text"
              name="supplier"
              placeholder="Supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              required
              className="border p-2 mb-4 w-full"
            />
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <Input
              type="url"
              name="website"
              placeholder="Website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="border p-2 mb-4 w-full"
            />

            <Select onValueChange={(value) => setCategoryId(Number(value))}>
              <SelectTrigger>
                <SelectValue
                  className="text-black"
                  placeholder="Select Category"
                />
              </SelectTrigger>
              <SelectContent className="text-black">
                {categories.map((category: { id: number; name: string }) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={String(quantity)}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="mt-3 border p-2 mb-4 w-full"
            />

            <Select onValueChange={(value) => setLocationId(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location: { id: number; name: string }) => (
                  <SelectItem key={location.id} value={String(location.id)}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="text"
              name="required_for"
              placeholder="Required For"
              value={required_for}
              onChange={(e) => setRequiredFor(e.target.value)}
              required
              className="mt-2 border p-2 mb-4 w-full"
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !required_by && "text-muted-foreground"
                  )}
                >
                  {required_by ? (
                    format(required_by, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={required_by}
                  onSelect={setRequiredBy}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
          <CardFooter>
            <Button type="submit">Add Product</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
