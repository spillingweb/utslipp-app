import { router, useForm } from '@inertiajs/react';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';

export type FilterDataType = {
    filterField1: string;
    filterRelOp1: string;
    filterValue1: string;
    logicalOp: string;
    filterField2: string;
    filterRelOp2: string;
    filterValue2: string;
};

type filterOptions = '' | 'tilsyn' | 'alle' | 'frist';

type FilterContextType = {
    filterValue: filterOptions;
    setFilterValue: React.Dispatch<React.SetStateAction<filterOptions>>;
    data: FilterDataType;
    setData: (field: keyof FilterDataType, value: string | undefined) => void;
    handleChangeFilter: (value: filterOptions) => void;
    handleCustomFilter: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const FilterContext = createContext<FilterContextType>({
    filterValue: 'tilsyn',
    setFilterValue: () => {},
    data: {
        filterField1: '',
        filterRelOp1: '',
        filterValue1: '',
        logicalOp: '',
        filterField2: '',
        filterRelOp2: '',
        filterValue2: '',
    },
    setData: () => {},
    handleChangeFilter: () => {},
    handleCustomFilter: () => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const isInitialRender = useRef(true);

    // initialize custom filter form
    const { data, setData, post, reset } = useForm<FilterDataType>({
        filterField1: '',
        filterRelOp1: '',
        filterValue1: '',
        logicalOp: '',
        filterField2: '',
        filterRelOp2: '',
        filterValue2: '',
    });

    const [filterValue, setFilterValue] = useState<filterOptions>('tilsyn');

    const filterUrl = useMemo(() => {
        const url = new URL(route('map'));
        if (filterValue) {
            url.searchParams.append('filter', filterValue);
        }
        return url.toString();
    }, [filterValue]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        if (filterValue === '') return;

        // Update the URL with the new filter parameters
        router.visit(filterUrl, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [filterUrl, reset, filterValue]);

    const handleChangeFilter = (value: filterOptions) => {
        setFilterValue(value);
        reset(); // Reset custom filter form data
    };

    const handleCustomFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Client-side validation
        if (!data.filterField1) {
            alert('Vennligst oppgi et gyldig filter');
            return;
        }

        // Filter objects
        post(route('map.filter'), {
            onSuccess: () => {
                setFilterValue('');
            },
        });
    };

    const ctxValue = {
        filterValue,
        setFilterValue,
        data,
        setData,
        handleChangeFilter,
        handleCustomFilter,
    };

    return <FilterContext.Provider value={ctxValue}>{children}</FilterContext.Provider>;
};
