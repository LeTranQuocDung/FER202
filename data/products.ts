export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    description: "A comfortable, everyday essential white t-shirt.",
    price: 19.99,
    category: "Clothing",
    image: "/images/product-1.webp",
  },
  {
    id: 2,
    name: "Denim Jacket",
    description: "Stylish and durable denim jacket for any season.",
    price: 59.99,
    category: "Clothing",
    image: "/images/product-2.webp",
  },
  {
    id: 3,
    name: "Running Sneakers",
    description: "Lightweight and breathable sneakers for your daily run.",
    price: 89.99,
    category: "Footwear",
    image: "/images/product-3.webp",
  },
  {
    id: 4,
    name: "Leather Wallet",
    description: "Premium leather wallet with multiple card slots.",
    price: 34.99,
    category: "Accessories",
    image: "/images/product-4.webp",
  },
  {
    id: 5,
    name: "Sunglasses",
    description: "UV protection sunglasses with a classic design.",
    price: 24.99,
    category: "Accessories",
    image: "/images/product-5.webp",
  },
  {
    id: 6,
    name: "Backpack",
    description: "Spacious and water-resistant backpack for travel or school.",
    price: 49.99,
    category: "Accessories",
    image: "/images/product-6.webp",
  }
];
