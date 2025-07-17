export interface BeneficiaryResponseType {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    relationship: string;
    phoneNumber?: string;
    email: string;
    address?: string;
    allocation?: string;
    image?: string;
    imageUrl?: string;

}