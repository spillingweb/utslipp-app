import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    flash: {
        success: string | undefined;
        error: string | undefined;
    };
    projects: { name: string; id: number }[];
    users: Data<User>;
    can: {
        project_show: boolean;
        project_edit: boolean;
        tilsyn_object_show: boolean;
        tilsyn_object_edit: boolean;
        user_access: boolean;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface TilsynObject {
    id: string;
    updated_at: string;
    gnr: string;
    bnr: string;
    fnr: string;
    adresse: string;
    bygning: string;
    sone: string;
    status: string;
    saksnr: string;
    kommentar: string;
    frist: string;
    saksbeh: string;
    endret_av: string;
    svarskjema: string;
    komtek: string;
    kontroll: string;
    arkiv: string;
    hjemmel: string;
    project_id: string;
    [key: string]: string | number | undefined; // This allows for additional properties...
}

interface AddressData {
    adressetekst: string;
    adressenavn?: string;
    nummer?: string;
    gardsnummer: string;
    bruksnummer: string;
    festenummer: string;
    representasjonspunkt: {
        lat: number;
        lon: number;
    };
}

export type SearchFormValues = {
    gardsnummer: string;
    bruksnummer: string;
    festenummer: string;
    adressenavn: string;
    nummer: string;
};

export type Data<T> = {
    data: T[];
};

export type Role = {
    id: number;
    name: string;
    description: string;
};
