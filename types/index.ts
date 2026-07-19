export interface Product {
  id: string;
  name: string;
  slug: string;
  origin: string;
  region: string;
  altitude: string;
  process: string;
  roastLevel: "light" | "medium" | "dark";
  flavorNotes: string[];
  price: number;
  weight: number;
  description: string;
  image?: string;
}

export interface OriginStory {
  id: string;
  name: string;
  country: string;
  region: string;
  farmer: string;
  altitude: string;
  process: string;
  story: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
