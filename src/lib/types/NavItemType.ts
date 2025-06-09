export type NavItemType = {
    label: string;
    href?: string;
    isButton?: boolean;
    dropdown?: {
        label: string;
        href: string;
    }[];
};