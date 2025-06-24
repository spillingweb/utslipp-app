import { AddressData, SharedData, TilsynObject } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { createContext, useState } from 'react';

const initialValues: TilsynObject = {
    id: '',
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
    saksbeh: '',
    endret_av: '',
    svarskjema: '',
    komtek: '',
    kontroll: '',
    arkiv: '',
    hjemmel: '',
    project_id: '',
};

type TilsynFormContextType = {
    data: TilsynObject;
    setData: any;
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
    processing: boolean;
    storeTilsynObject: () => void;
    updateTilsynObject: () => void;
    cancel: () => void;
};

const TilsynFormContext = createContext<TilsynFormContextType>({
    data: initialValues,
    setData: () => {},
    tilsynFormProperties: {
        open: false,
        disabled: true,
    },
    setTilsynFormProperties: () => {},
    startNewTilsyn: () => {},
    processing: false,
    storeTilsynObject: () => {},
    updateTilsynObject: () => {},
    cancel: () => {},
});

const TilsynFormProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, setData, reset, processing, post, put, cancel } = useForm<TilsynObject>(initialValues);
    const [tilsynFormProperties, setTilsynFormProperties] = useState({
        open: false,
        disabled: true,
    });

    const { auth } = usePage<SharedData>().props;

    function startNewTilsyn(address: AddressData, zone: number) {
        reset(); // Reset form data before starting a new tilsyn

        // Set initial values based on the provided address and zone
        const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst } = address;

        setData({
            id: '',
            updated_at: '',
            gnr: gnr,
            bnr: bnr,
            fnr: fnr,
            adresse: adressetekst,
            sone: zone.toString(),
            bygning: 'B', // Default value for building type
            status: 'T', // Default status for new tilsyn object
            saksnr: '',
            kommentar: '',
            frist: '',
            saksbeh: auth.user.name,
            endret_av: auth.user.name,
            svarskjema: '',
            komtek: '',
            kontroll: '',
            arkiv: '',
            hjemmel: '',
            project_id: '',
        });

        setTilsynFormProperties({
            open: true,
            disabled: false,
        });
    }

    const storeTilsynObject = () => {
        console.log(data);
        post(route('map.store'), {
            onError: (errors) => {
                console.error('Error storing tilsyn object:', errors);
            },
            onSuccess: () => {
                setTilsynFormProperties({ open: false, disabled: true });
                reset(); // Reset form data after successful submission
            },
        });
    };

    const updateTilsynObject = () => {
        console.log(data);
        put(route('map.update', data.id), {
            onError: (errors) => {
                console.error('Error updating tilsyn object:', errors);
            },
            onSuccess: () => {
                setTilsynFormProperties({ open: false, disabled: true });
            },
        });
    };

    const ctxValue = {
        data,
        setData,
        tilsynFormProperties,
        setTilsynFormProperties,
        startNewTilsyn,
        processing,
        storeTilsynObject,
        updateTilsynObject,
        cancel,
    };

    return <TilsynFormContext value={ctxValue}>{children}</TilsynFormContext>;
};

export { TilsynFormContext, TilsynFormProvider };
