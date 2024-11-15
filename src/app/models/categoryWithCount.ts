import { Category } from "./category";

export interface CategoryWithCount extends Category {
    productCount?: number;
  }