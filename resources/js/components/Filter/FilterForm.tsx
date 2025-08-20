import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Input } from '../ui/Input';
import Select from '../ui/Select';
import styles from './FilterForm.module.css';

type FilterFormProps = {
    index: number;
    formData: {
        filterField1: string;
        filterRelOp1: string;
        filterValue1: string;
        filterField2: string;
        filterRelOp2: string;
        filterValue2: string;
    };
    setData: (field: string, value: string) => void;
};

const FilterForm = ({ index, setData, formData }: FilterFormProps) => {
    const { projects, users } = usePage<{ projects: { name: string; id: number }[]; users: User[] }>().props;
    const [selectedField, setSelectedField] = useState<string>('');

    const filterField = `filterField${index}`;
    const filterRelOp = `filterRelOp${index}`;
    const filterValue = `filterValue${index}`;

    const FILTER_SELECT_OPTIONS = [
        { value: 'null', text: 'Velg felt' },
        {
            value: 'bygning',
            text: 'Bygningstype',
            options: [
                { value: 'B', text: 'Bolig' },
                { value: 'H', text: 'Fritidsbolig' },
                { value: 'N', text: 'Næringsbygg' },
                { value: 'I', text: 'Ingen bygning' },
            ],
        },
        {
            value: 'project_id',
            text: 'Prosjekt',
            options: projects.map((project) => ({ value: project.id, text: `${project.id} - ${project.name}` })),
        },
        { value: 'status', text: 'Status', options: TILSYN_STATUS.map((status) => ({ value: status.value, text: status.text })) },
        {
            value: 'hjemmel',
            text: 'Hjemmel',
            options: [
                { value: '27-2', text: '§ 27-2 i plan- og bygningsloven (tilknytningsplikt)' },
                { value: '7', text: '§ 7 i forurensningsloven (ulovlig forurensning)' },
                { value: '18', text: '§ 18 i forurensningsloven (trekke tilbake tillatelse)' },
                { value: '12-16', text: '§ 12-16 i forurensningsforskriften (ulovliggjøre utslipp)' },
                { value: 'other', text: 'Annen hjemmel' },
            ],
        },
        { value: 'saksbeh', text: 'Saksbehandler', options: users.map((user) => ({ value: user.name, text: user.name })) },
        { value: 'frist', text: 'Frist' },
        {
            value: 'sone',
            text: 'Sone',
            options: [
                { value: '1', text: '1 - Steinsfjorden' },
                { value: '2', text: '2 - Sogna' },
                { value: '3', text: '3 - Tyrifjorden' },
                { value: '4', text: '4 - Randselva/Storelva' },
                { value: '5', text: '5 - Begna' },
                { value: '6', text: '6 - Lysakervassdraget' },
                { value: '7', text: '7 - Sandviksvassdraget' },
            ],
        },
    ];

    useEffect(() => {
        const fieldInput = index === 1 ? formData.filterField1 : formData.filterField2;
        if (fieldInput === '') {
            setSelectedField('');
        }
    }, [formData, index]);

    const selectedFieldOptions = FILTER_SELECT_OPTIONS.find((option) => option.value === selectedField)?.options || [];

    const handleSelectField = (value: string) => {
        setSelectedField(value);
        setData(filterField, value);
        setData(filterRelOp, '=');
    };

    return (
        <fieldset id={`filterForm${index}`} className={styles.filterForm}>
            <Select
                name={filterField}
                id={filterField}
                value={index === 1 ? formData.filterField1 : formData.filterField2}
                onChange={(e) => handleSelectField(e.target.value)}
            >
                {FILTER_SELECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text || option.value}
                    </option>
                ))}
            </Select>
            <Select
                name={filterRelOp}
                id={filterRelOp}
                onChange={(e) => setData(filterRelOp, e.target.value)}
                value={index === 1 ? formData.filterRelOp1 : formData.filterRelOp2}
            >
                <option value="=">=</option>
                <option value="!=">!=</option>
                {selectedField === 'frist' && (
                    <>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                    </>
                )}
            </Select>
            {selectedField ? (
                selectedField === 'frist' ? (
                    <Input name={filterValue} id={filterValue} type="date" onChange={(e) => setData(filterValue, e.target.value)} />
                ) : (
                    <Select
                        name={filterValue}
                        id={filterValue}
                        value={index === 1 ? formData.filterValue1 : formData.filterValue2}
                        onChange={(e) => setData(filterValue, e.target.value)}
                    >
                        <option value="">Velg verdi</option>
                        {selectedFieldOptions.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.text || option.value}
                                </option>
                            );
                        })}
                        {selectedField === 'project_id' && <option value="null">Ingen prosjekt</option>}
                    </Select>
                )
            ) : null}
        </fieldset>
    );
};

export default FilterForm;
