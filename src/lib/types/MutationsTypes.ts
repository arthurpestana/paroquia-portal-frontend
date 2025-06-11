import { ContactType, UserRole, Weekday } from "./enums";

export type UserRequest = {
    name?: string
    email: string
    password: string
    isActive?: boolean
    role?: UserRole
}

export type RegisterRequest = {
    name: string
    email: string
    password: string
    isActive?: boolean
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type ImageRequest = {
    title: string;
    description?: string;
    folder?: string;
    publicId?: string;
    url?: string;
}

export type BannerRequest = {
    title: string;
    description: string;
    isActive?: boolean;
    buttonInfo?: {
        text: string;
        link: string;
    };
    image?: string;
}

export type ContactRequest = {
    value: string;
    isActive?: boolean;
    type: ContactType;
};

export type EventRequest = {
    title: string
    description: string
    isActive?: boolean
    date: number
    startTime?: number
    endTime?: number
    location: string
    image?: string
}

export type MassTimeRequest = {
    weekday: Weekday
    date?: number
    specificDate?: number
    startTime: number
    title?: string
    description?: string
}

export type PastoralRequest = {
    title: string
    description: string
    isActive?: boolean
    image?: string
}

export type PriestRequest = {
    name: string
    origin: string
    isActive?: boolean
    function: string[]
    image?: string
    order?: number
}

