import { getFilterSelectOptions } from '@/lib/filterSelectOptions';
import { FilterContext, FilterDataType } from '@/store/filter-context';
import { Data, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { use, useEffect, useState } from 'react';
import { Input } from '../ui/Input';
import Select from '../ui/Select';
import styles from './FilterForm.module.css';

const FilterForm = ({ index }: { index: number }) => {
    const { data: formData, setData } = use(FilterContext);
    const { projects, users } = usePage<{ projects: { name: string; id: number }[]; users: Data<User> }>().props;
    const [selectedField, setSelectedField] = useState<string>('');

    const filterField = `filterField${index}` as keyof FilterDataType;
    const filterRelOp = `filterRelOp${index}` as keyof FilterDataType;
    const filterValue = `filterValue${index}` as keyof FilterDataType;

    const FILTER_SELECT_OPTIONS = getFilterSelectOptions(users, projects);

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
                        <option value="">{selectedField === 'project_id' ? 'Ingen prosjekt' : 'Velg verdi'}</option>
                        {selectedFieldOptions.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.text || option.value}
                                </option>
                            );
                        })}
                    </Select>
                )
            ) : null}
        </fieldset>
    );
};

export default FilterForm;
