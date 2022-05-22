export interface FoodItem {
  name: string;
  calories: number;
}

export interface Category {
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
