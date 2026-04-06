export interface Product {
  id: number;
  category: "luxury" | "sport" | "classic";
  nameEn: string;
  nameAr: string;
  price: number;
  originalPrice?: number | null;
  featured: boolean;
  inStock: boolean;
  image: string;
  images: string[];
  descriptionEn: string;
  descriptionAr: string;
  specs: Record<string, string>;
}

export interface CartItem {
  id: number;
  nameEn: string;
  nameAr: string;
  price: number;
  image: string;
  qty: number;
}

export interface OrderItem {
  name: string;
  nameAr: string;
  qty: number;
  price: number;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
export type PaymentMethod = "cod" | "mada" | "apple_pay" | "whatsapp";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  payment: PaymentMethod;
  status: OrderStatus;
  date: string;
}

export interface StoreSettings {
  storeName: string;
  storeNameAr: string;
  primaryColor: string;
  whatsappNumber: string;
}

export type Language = "ar" | "en";
