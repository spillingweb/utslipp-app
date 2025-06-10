import { AddressData, SharedData, TilsynObject } from '@/types';
import { usePage } from '@inertiajs/react';
import { createContext, useState } from 'react';

const initialData: TilsynObject = {
    updated_at: '',
    gnr: '',
    bnr: '',
    fnr: '',
    adresse: '',
    sone: '',
    bygning: '',
    status: '',
    saksnr: '',
    kommentar: '',
    frist: '',
    saksbehandler: '',
    endret_av: '',
    svarskjema: '',
    komtek: '',
    kontroll: '',
    arkiv: '',
    hjemmel: '',
    prosjekt: '',
};

type TilsynFormContextType = {
    tilsynFormData: TilsynObject;
    setTilsynFormData: React.Dispatch<React.SetStateAction<TilsynObject>>;
    tilsynFormProperties: {
        open: boolean;
        disabled: boolean;
    };
    setTilsynFormProperties: React.Dispatch<
        React.SetStateAction<{
            open: boolean;
            disabled: boolean;
        }>
    >;
    startNewTilsyn: (address: AddressData, zone: number) => void;
};

const TilsynFormContext = createContext<TilsynFormContextType>({
    tilsynFormData: initialData,
    setTilsynFormData: () => {},
    tilsynFormProperties: {
        open: false,
        disabled: true,
    },
    setTilsynFormProperties: () => {},
    startNewTilsyn: () => {},
});

const TilsynFormProvider = ({ children }: { children: React.ReactNode }) => {
    const [tilsynFormData, setTilsynFormData] = useState<TilsynObject>(initialData);
    const [tilsynFormProperties, setTilsynFormProperties] = useState({
        open: false,
        disabled: true,
    });

    const { auth } = usePage<SharedData>().props;

    function startNewTilsyn(address: AddressData, zone: number) {
        const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst } = address;

        setTilsynFormData({
            updated_at: '',
            gnr: gnr,
            bnr: bnr,
            fnr: fnr,
            adresse: adressetekst,
            bygning: '',
            sone: zone.toString(),
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

    const ctxValue = {
        tilsynFormData,
        setTilsynFormData,
        tilsynFormProperties,
        setTilsynFormProperties,
        startNewTilsyn,
    };

    return <TilsynFormContext value={ctxValue}>{children}</TilsynFormContext>;
};

export { TilsynFormContext, TilsynFormProvider };
