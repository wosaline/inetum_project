export interface User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: string;
}

