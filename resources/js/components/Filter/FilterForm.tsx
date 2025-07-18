import { TILSYN_STATUS } from '@/lib/tilsynStatus';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Input } from '../ui/Input';
import Select from '../ui/Select';
import styles from './FilterForm.module.css';

type FilterFormProps = {
    index: number;
};

const FilterForm = ({ index }: FilterFormProps) => {
    const { projects, users } = usePage<{ projects: { name: string; number: number }[]; users: User[] }>().props;
    const [selectedField, setSelectedField] = useState('');

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
        { value: 'prosjekt', options: projects.map((project) => ({ value: project.number, text: `${project.number} - ${project.name}` })) },
        { value: 'status', options: TILSYN_STATUS.map((status) => ({ value: status.value, text: status.text })) },
        {
            value: 'hjemmel',
            options: [
                { value: '27-2', text: '§ 27-2 i plan- og bygningsloven (tilknytningsplikt)' },
                { value: '7', text: '§ 7 i forurensningsloven (ulovlig forurensning)' },
                { value: '18', text: '§ 18 i forurensningsloven (trekke tilbake tillatelse)' },
                { value: '12-16', text: '§ 12-16 i forurensningsforskriften (ulovliggjøre utslipp)' },
                { value: 'other', text: 'Annen hjemmel' },
            ],
        },
        { value: 'saksbeh', text: 'Saksbehandler', options: users.map((user) => ({ value: user.name, text: user.name })) },
        { value: 'frist' },
        {
            value: 'sone',
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

    let secondFilter: React.ReactNode = null;

    if (selectedField === 'frist') {
        secondFilter = <Input type="date" />;
    } else {
        const filterOptions = FILTER_SELECT_OPTIONS.find((option) => option.value === selectedField)?.options || [];

        secondFilter = (
            <Select name={`filterVerdi${index}`} id={`filterVerdi${index}`} className={styles.capitalize}>
                {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text || option.value}
                    </option>
                ))}
            </Select>
        );
    }

    return (
        <fieldset id={`filterForm${index}`} className={styles.filterForm}>
            <Select
                name={`filterFelt${index}`}
                id={`filterFelt${index}`}
                onChange={(e) => setSelectedField(e.target.value)}
                className={styles.capitalize}
            >
                {FILTER_SELECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text || option.value}
                    </option>
                ))}
            </Select>
            <Select name={`filterLogOp${index}`} id={`filterLogOp${index}`}>
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
            </Select>
            {secondFilter}
        </fieldset>
    );
};

export default FilterForm;
