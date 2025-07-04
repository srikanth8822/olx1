// Product/Ad Post Types
export interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  location?: string;
  city?: string;
  thumb?: string | null;
  description?: string;
  seller_name?: string;
  condition?: string;
  phone?: string;
  created_at?: string;
  images?: string[];
}

// User Types
export interface User {
  _id?: string;
  first_name: string;
  last_name?: string;
  email: string;
  name?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  first_name: any;
  message?: string;
  error?: string;
  data?: T;
  session?: string;
}

// Component Props Types
export interface NavbarProps {
  setSearch: (search: string) => void;
  setLocation: (location: string) => void;
}

export interface ProductsProps {
  products: Product[];
  search: string;
  menu: string;
  location: string;
}

export interface MenuProps {
  setMenu: (menu: string) => void;
}

export interface LoginProps {
  setLoginPop: (value: boolean) => void;
}