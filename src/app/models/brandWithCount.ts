import { Brand } from "./brand";

export interface BrandWithCount extends Brand {
    count?: number;
  }