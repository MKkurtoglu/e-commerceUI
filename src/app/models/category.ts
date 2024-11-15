import { EntityImage } from "./entityImage";

export interface Category {
    categoryId: number;
    categoryName: string;
    isDeleted: boolean;
    images?: EntityImage | null; // `EntityImage` ile ilişki, nullable olabilir
  }