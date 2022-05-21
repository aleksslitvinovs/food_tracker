export interface FoodItem {
  name: string;
  calories: number;
}

export interface Categories {
  snacks: FoodItem[];
  fruits: FoodItem[];
  vegetables: FoodItem[];
  dairyAndEggs: FoodItem[];
  sweets: FoodItem[];
  meat: FoodItem[];
  pantry: FoodItem[];
  bakery: FoodItem[];
}
