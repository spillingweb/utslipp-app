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
    id: number | undefined;
    updated_at: string;
    gnr: number;
    bnr: number;
    fnr: number;
    adresse: string;
    bygning: string;
    sone: number;
    status: string;
    saksnr: string;
    kommentar: string;
    frist: string;
    saksbehandler: string;
    endret_av: string;
    svarskjema: string;
    komtek: string;
    kontroll: string;
    arkiv: string;
    hjemmel: string;
    prosjekt: string;
};

export type AddressData = {
    adressetekst: string;
    adressenavn: string;
    nummer: number;
    gardsnummer: number;
    bruksnummer: number;
    festenummer: number;
    representasjonspunkt: {
        epsg: string;
        lat: number;
        lon: number;
    };
};

export type SearchFormValues = {
    gardsnummer: string;
    bruksnummer: string;
    festenummer: string;
    adressenavn: string;
    nummer: string;
};