export interface FoodItem {
  icon: string;
  name: string;
  calories: number;
}

export interface Category {
  icon: string;
  items: FoodItem[];
}
export interface Categories {
  snacks: Category;
  fruits: Category;
  vegetables: Category;
  dairyAndEggs: Category;
  sweets: Category;
  meat: Category;
  pantry: Category;
  bakery: Category;
}
