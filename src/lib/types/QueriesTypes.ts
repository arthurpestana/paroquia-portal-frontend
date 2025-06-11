import { ContactType, UserRole, Weekday } from "./enums";

export type UserResponse = {
    _id: string
    name: string
    email: string
    role: UserRole
    isActive: boolean
    createdAt: number
    updatedAt: number
}

export type LoginResponse = {
    token: string;
    user: UserResponse;
}

export type ImageResponse = {
    _id: string;
    publicId: string;
    url: string;
    title: string;
    description?: string | null;
    folder?: string;
    createdAt: number;
    updatedAt: number;
}

export type BannerResponse = {
    _id: string;
    title: string;
    description: string;
    image?: ImageResponse;
    order: number;
    isActive: boolean;
    buttonInfo: {
        text: string;
        link: string;
    };
    createdAt: string;
    updatedAt: string;
};

export type ContactResponse = {
    _id: string;
    value: string;
    isActive: boolean;
    type: ContactType;
    createdAt: number;
    updatedAt: number;
};

export type EventResponse = {
    _id: string
    title: string
    description: string
    isActive: boolean
    date: number
    startTime: number
    endTime: number
    location: string
    image?: ImageResponse
    createdAt: number
    updatedAt: number
}

export type MassTimeResponse = {
    _id: string
    weekday: Weekday
    startTime: number
    title?: string | null
    specificDate?: number | null
    description?: string | null
    createdAt: number
    updatedAt: number
}

export type PastoralResponse = {
    _id: string
    title: string
    description: string
    isActive: boolean
    image?: ImageResponse
    createdAt: number
    updatedAt: number
}

export type PriestResponse = {
    _id: string
    name: string
    origin: string
    isActive: boolean
    function: string[]
    image?: ImageResponse
    order: number
    createdAt: number
    updatedAt: number
}

export type UserCountResponse = {
  totalCount: number;
  users: UserResponse[];
};

export type BannerCountResponse = {
  totalCount: number;
  banners: BannerResponse[];
};

export type ContactCountResponse = {
  totalCount: number;
  contacts: ContactResponse[];
};

export type EventCountResponse = {
  totalCount: number;
  events: EventResponse[];
};

export type MassTimeCountResponse = {
  totalCount: number;
  massTimes: MassTimeResponse[];
};

export type PastoralCountResponse = {
  totalCount: number;
  pastorals: PastoralResponse[];
};

export type PriestCountResponse = {
  totalCount: number;
  priests: PriestResponse[];
};

export type ImageCountResponse = {
  totalCount: number;
  images: ImageResponse[];
};
