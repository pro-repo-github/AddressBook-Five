export interface address {
  street?: string;
  postcode?: string;
  city?: string;
  country?: string;
}
export interface Company {
  name?: string;
  catchPhrase?: string;
  website?: string;
}
export interface Address {
  id?: number;
  firstname?: string;
  surname?: string;
  email?: string;
  phone?: number;
  addresses?: address[];
  company?: Company;
}
export function createInitialAddress(): Address {
  return {
    addresses:[],
    company:{}
  };
}