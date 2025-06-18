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
        { value: 'hjemmel' },
        { value: 'saksbeh', text: 'Saksbehandler', options: users.map((user) => ({ value: user.name, text: user.name })) },
        { value: 'frist' },
        { value: 'sone' },
    ];

    let secondFilter: React.ReactNode = null;

    if (selectedField === 'frist') {
        secondFilter = <Input type="date" />;
    } else {
        const filterOptions = FILTER_SELECT_OPTIONS.find((option) => option.value === selectedField)?.options || [];

        secondFilter = (
            <Select name={`filterVerdi${index}`} id={`filterVerdi${index}`}>
                {filterOptions.map((option) => (
                    <option key={option.value} value={option.value} className={styles.capitalize}>
                        {option.text || option.value}
                    </option>
                ))}
            </Select>
        );
    }

    return (
        <fieldset id={`filterForm${index}`} className={styles.filterForm}>
            <Select name={`filterFelt${index}`} id={`filterFelt${index}`} onChange={(e) => setSelectedField(e.target.value)}>
                {FILTER_SELECT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value} className={styles.capitalize}>
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
