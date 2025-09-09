import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Heading from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import { useForm } from '@inertiajs/react';
import styles from './CreateProject.module.css';

type NewProjectForm = {
    name: string;
    id: string;
};

const CreateProject = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<NewProjectForm>>({
        name: '',
        id: '',
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
                <fieldset className={styles.input}>
                    <label htmlFor="id">Prosjektnummer</label>
                    <Input
                        id="id"
                        type="number"
                        aria-required
                        autoFocus
                        tabIndex={0}
                        value={data.id}
                        onChange={(e) => setData('id', e.target.value)}
                    />
                    <InputError message={errors.id && 'ID-en er allerede i bruk'} />
                </fieldset>
                <fieldset className={styles.input}>
                    <label htmlFor="name">Navn på prosjektet</label>
                    <Input
                        id="name"
                        type="text"
                        tabIndex={0}
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
