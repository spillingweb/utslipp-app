import InputError from '@/components/InputError';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import { Input } from '@/components/ui/Input';
import ReturnButton from '@/components/ui/ReturnButton';
import AppLayout from '@/layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

type NewProjectForm = {
    name: string;
    id: string;
};

const Edit = ({ project }: { project: { id: string; name: string } }) => {
    const { data, setData, put, processing, errors, reset } = useForm<Required<NewProjectForm>>({
        name: project.name,
        id: project.id,
    });

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        put(route('project.update', project.id), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <Head title="Rediger prosjekt" />
            <FormCard onSubmit={handleSubmit} heading="Rediger prosjekt">
                <fieldset>
                    <label className='bold' htmlFor="id">Prosjektnummer</label>
                    <Input id="id" type="number" autoFocus tabIndex={0} value={data.id} onChange={(e) => setData('id', e.target.value)} />
                    <InputError message={errors.id && 'ID-en er allerede i bruk'} />
                </fieldset>
                <fieldset>
                    <label className='bold' htmlFor="name">Navn på prosjektet</label>
                    <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    <InputError message={errors.name && 'Navnet er allerede i bruk'} />
                </fieldset>
                <Button type="submit" tabIndex={0} disabled={processing}>
                    Lagre endringer
                </Button>
                <ReturnButton href={route('projects')}>Tilbake til prosjekter</ReturnButton>
            </FormCard>
        </AppLayout>
    );
};

export default Edit;
