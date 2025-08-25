export interface OrderStatus {
  value: string;
  label: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingMethod {
  value: string;
  label: string;
}

export interface PaymentMethod {
  value: string;
  label: string;
}

export interface OrderItem {
  id: number;
  status: OrderStatus;
  status_html: string;
  customer: Customer;
  created_at: string;
  amount: string;
  amount_formatted: string;
  tax_amount: string;
  tax_amount_formatted: string;
  shipping_amount: string;
  shipping_amount_formatted: string;
  shipping_method: ShippingMethod;
  shipping_status: OrderStatus;
  shipping_status_html: string;
  payment_method: PaymentMethod;
  payment_status: OrderStatus;
  payment_status_html: string;
}

export interface OrdersPagination {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
}

export interface OrdersResponse {
  data: OrderItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  error: boolean;
  message: string | null;
}
