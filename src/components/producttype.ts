//set default thumbnail to be empty record
export type Product = {
  name: string;
  image: string;
  description: string;
  thumbnails: string[] | [];
  price: number;
  numberOfServings?: number;
  url: string;
  form: string;
  brand: string;
  ingredients: string[];
};

export type ResponseData = {
  noanswer: string;
  products: Product[];
  question: string;
  summary: string;
  message: string;
};
