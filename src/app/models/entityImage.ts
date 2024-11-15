import { BaseImage } from "./baseImage";


export interface EntityImage {
  entityImageId: number;
  imageId: number;
  entityType: string;
  entityId: number;
  isPrimary: boolean;
  productId?: number;
  categoryId?: number;
  brandId?: number;
  image?: BaseImage | null; // `BaseImage` ile ilişki, nullable olabilir
}
