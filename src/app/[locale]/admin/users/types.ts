export interface DeleteState {
    pending: boolean;
    status: null | number;
    message: string;
}

export interface UserResponse {
    status: number;
    message: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    image?: string | null;
    country?: string | null;
    city?: string | null;
    postalCode?: string | null;
    streetAddress?: string | null;
    phone?: string | null;
}

export interface UsersPageProps {
    params: Promise<{ locale: string }>;
}

export interface EditUserPageProps {
    params: Promise<{ userId: string; locale: string }>;
}

export interface DeleteUserButtonProps {
    userId: string;
}
