export interface IUser {
    id?: number | string;
    name?: string;
    email: string;
    role?: string;
    password: string;
}

export interface FindBy {
    key: string;
    value: string;
    
}
  
export interface IQuery {
  [key: string]: any;
}

export interface IProduct {
  id?: number | string;
  name: string;
  price?: number;
  description?: string;
}