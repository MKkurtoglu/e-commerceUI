import { SocialMedia } from "./socialMedia";

export interface Contact {
    socialMedia:SocialMedia,
    mapUrl:string,
    emailAddresses:string[],
    phoneNumbers:string[],
    whatsappNumber:string
}