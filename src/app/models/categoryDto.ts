export interface CategoryDto {
    categoryId: number;
    categoryName: string;
    isDeleted: boolean;
    imagePaths:string // `EntityImage` ile ilişki, nullable olabilir
  }