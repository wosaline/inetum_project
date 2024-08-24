export interface User {
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: string;
}

