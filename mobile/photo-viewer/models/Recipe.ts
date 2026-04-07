export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string; // JSON string
  instructions: string; // JSON string
  image_url: string;
  cooking_time: number;
  difficulty: string;
  premium: boolean;
  price: string;
  category: {
    id: number;
    name: string;
  };
}
