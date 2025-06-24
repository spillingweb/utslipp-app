import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Heading from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import { useForm } from '@inertiajs/react';
import styles from './CreateProject.module.css';

type NewProjectForm = {
    name: string;
    number: string;
};

const CreateProject = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<NewProjectForm>>({
        name: '',
        number: '',
    });

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        post(route('project.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <li className={styles.createProject}>
            <Heading level={2} className={styles.heading}>
                Opprett nytt prosjekt
            </Heading>
            <Form onSubmit={handleSubmit}>
                <fieldset className={`${styles.input} ${errors.number ? styles.error : ''}`}>
                    <label htmlFor="number">Prosjektnummer</label>
                    <Input
                        id="number"
                        type="number"
                        required
                        autoFocus
                        tabIndex={0}
                        autoComplete="number"
                        value={data.number}
                        onChange={(e) => setData('number', e.target.value)}
                    />
                    <InputError message={errors.number && 'Nummeret er allerede i bruk'} />
                </fieldset>
                <fieldset className={`${styles.input} ${errors.number ? styles.error : ''}`}>
                    <label htmlFor="name">Navn på prosjektet</label>
                    <Input
                        id="name"
                        type="text"
                        tabIndex={0}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name && 'Vennligst oppgi et prosjektnavn'} />
                </fieldset>
                <Button type="submit" tabIndex={0} disabled={processing}>
                    Opprett prosjekt
                </Button>
            </Form>
        </li>
    );
};

export default CreateProject;
