import { AddressData, SharedData, TilsynObject } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export const useTilsynForm = () => {
    const [tilsynData, setTilsynData] = useState<TilsynObject | null>(null);
    const [tilsynFormProperties, setTilsynFormProperties] = useState({
        open: false,
        disabled: true,
    });

    const { auth } = usePage<SharedData>().props;

    function startNewTilsyn(address: AddressData, zone: number) {
        const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst } = address;

        setTilsynData({
            id: undefined,
            updated_at: '',
            gnr: gnr,
            bnr: bnr,
            fnr: fnr,
            adresse: adressetekst,
            bygning: '',
            sone: zone,
            status: 'T',
            saksnr: '',
            kommentar: '',
            frist: '',
            saksbehandler: auth.user.name,
            endret_av: auth.user.name,
            svarskjema: '',
            komtek: '',
            kontroll: '',
            arkiv: '',
            hjemmel: '',
            prosjekt: '',
        });

        setTilsynFormProperties({
            open: true,
            disabled: false,
        });
    }

    return {
        tilsynData,
        setTilsynData,
        tilsynFormProperties,
        setTilsynFormProperties,
        startNewTilsyn,
    };
};
