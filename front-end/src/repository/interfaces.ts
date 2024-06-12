export interface Product {
  blockHash: any;
  manufacturerName: string;
  manufacturer?: string; //address
  // supplier: UserDetails;
  // vendor: UserDetails;
  // customer: UserDetails;
  name: string;
  isInBatch: boolean;
  batchCount: number;
  // expDateEpoch: number;
  manDateEpoch: number;
  barcodeId: string;
  productImage: string;
  productType: string;
  
  productHistory?: ProductHistory;
}
export interface UserDetails {
  role: UserRole;
  id_: string; // metamask address
  name: string;
  email: string;
  // user_type: string; //types
  // epochTime: number; // This will always have UTC epoch time
}

export interface UserHistory {
  id_: number; // account Id of the user
  date: number; // Added, Purchased date in epoch in UTC timezone
}

export interface ProductHistory {
  manufacturer: UserHistory;
  supplier: UserHistory;
  vendor: UserHistory;
  customers: UserHistory[];
}
export enum UserRole {
  Manufacturer,
  Supplier,
  Vendor,
  Customer,
}
export enum ProductType {
  Winter,
  Summer
  
}
