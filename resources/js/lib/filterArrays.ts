export type SelectOption = {
    value: string;
    text?: string;
};

export const FILTER_SELECT_OPTIONS: SelectOption[] = [
    { value: 'null', text: 'Velg felt' },
    { value: 'bygning', text: 'Bygningstype' },
    { value: 'prosjekt' },
    { value: 'status' },
    { value: 'hjemmel' },
    { value: 'saksbeh', text: 'Saksbehandler' },
    { value: 'frist' },
    { value: 'sone' },
];
