export interface User {
    id?: number; 
    username: string;
    email: string;
    password: string;
    userActivated?: boolean;
    phoneNumber?:string;
    createdAt?:string;
}