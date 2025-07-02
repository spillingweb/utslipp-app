import { AddressData, SharedData, TilsynObject } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { createContext, useState } from 'react';

const initialValues: TilsynObject = {
    lat: 0,
    lng: 0,
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

type TilsynFormProperties = {
    open: boolean;
    disabled: boolean;
    mode: 'create' | 'edit';
};

type TilsynFormContextType = {
    data: TilsynObject;
    setData: (key: keyof TilsynObject, value: TilsynObject[keyof TilsynObject]) => void;
    tilsynFormProperties: TilsynFormProperties;
    setTilsynFormProperties: React.Dispatch<React.SetStateAction<TilsynFormProperties>>;
    startNewTilsyn: (address: AddressData, zone: number) => void;
    processing: boolean;
    cancel: () => void;
    storeTilsynObject: () => void;
    updateTilsynObject: () => void;
    deleteTilsynObject: () => void;
};

const TilsynFormContext = createContext<TilsynFormContextType>({
    data: initialValues,
    setData: () => {},
    tilsynFormProperties: {
        open: false,
        disabled: true,
        mode: 'create',
    },
    setTilsynFormProperties: () => {},
    startNewTilsyn: () => {},
    processing: false,
    cancel: () => {},
    storeTilsynObject: () => {},
    updateTilsynObject: () => {},
    deleteTilsynObject: () => {},
});

const TilsynFormProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, setData, reset, processing, post, put, delete: destroy, cancel } = useForm<TilsynObject>(initialValues);
    const [tilsynFormProperties, setTilsynFormProperties] = useState<TilsynFormProperties>({
        open: false,
        disabled: true,
        mode: 'create',
    });

    const { auth } = usePage<SharedData>().props;

    function startNewTilsyn(address: AddressData, zone: number) {
        reset(); // Reset form data before starting a new tilsyn

        // Set initial values based on the provided address and zone
        const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst, representasjonspunkt } = address;

        setData({
            lat: representasjonspunkt.lat,
            lng: representasjonspunkt.lon,
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
            mode: 'create',
        });
    }

    const storeTilsynObject = () => {
        post(route('map.store'), {
            onError: (errors) => {
                console.error('Error storing tilsyn object:', errors);
            },
            onSuccess: () => {
                setTilsynFormProperties({ open: false, disabled: true, mode: 'create' });
                reset(); // Reset form data after successful submission
            },
        });
    };

    const updateTilsynObject = () => {
        put(route('map.update', data.id), {
            onError: (errors) => {
                console.error('Error updating tilsyn object:', errors);
            },
            onSuccess: () => {
                setTilsynFormProperties({ open: true, disabled: true, mode: 'create' });
            },
        });
    };

    const deleteTilsynObject = () => {
        destroy(route('map.destroy', data.id), {
            onSuccess: () => {
                setTilsynFormProperties({ open: false, disabled: true, mode: 'create' });
                reset(); // Reset form data after deletion
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
        cancel,
        storeTilsynObject,
        updateTilsynObject,
        deleteTilsynObject,
    };

    return <TilsynFormContext value={ctxValue}>{children}</TilsynFormContext>;
};

export { TilsynFormContext, TilsynFormProvider };
