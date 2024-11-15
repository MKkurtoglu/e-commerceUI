export interface DecodedToken{
    [key: string]: any; // Bu, herhangi bir string anahtarının kullanılmasını sağlar
      email?: string;
      exp?: number;
  }