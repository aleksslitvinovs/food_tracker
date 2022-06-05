export interface ConsumptionItem {
  name: string;
  calories: number;
  quantity: number;
}

export interface ConsumptionItemKey {
  [key: string]: ConsumptionItem;
}

export interface Consumption {
  [date: string]: ConsumptionItemKey;
}
