export type UserType = {
    id: string;
    email: string;
    isActive?: boolean;
    name?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type BannerType = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  isActive: boolean;
  buttonInfo: {
    text: string;
    link: string;
  };
  createdAt: string;
  updatedAt: string;
};