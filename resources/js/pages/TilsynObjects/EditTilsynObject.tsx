import TilsynFormFieldset from '@/components/TilsynObjects/TilsynFormFieldset';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';
import AppLayout from '@/layouts/AppLayout';
import { TilsynObject } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

const EditTilsynObject = ({ tilsynObject }: { tilsynObject: { data: TilsynObject } }) => {
    const tilsynData = tilsynObject.data;

    const { setData, data, put, cancel } = useForm<TilsynObject>({
        ...tilsynData,
    });

    const handleUpdateTilsynObject = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('tilsyn_object.update', tilsynData.id), {
            onError: (errors) => {
                console.error('Error updating tilsyn object:', errors);
            },
        });
    };

    const handleCancel = () => {
        cancel();
        router.get(route('tilsyn_objects'));
    };

    return (
        <AppLayout>
            <Head title="Rediger tilsynsobjekt" />
            <FormCard
                flex={false}
                heading={`${tilsynData.gnr}/${tilsynData.bnr}${data.fnr ? `/${tilsynData.fnr}` : ''} ${tilsynData.adresse}`}
                onSubmit={handleUpdateTilsynObject}
            >
                <TilsynFormFieldset data={data} setData={setData} disabled={false} />
                <Button type="submit">Lagre endringer</Button>
                <Button type="reset" variant="secondary" onClick={handleCancel}>
                    Avbryt
                </Button>
            </FormCard>
        </AppLayout>
    );
};

export default EditTilsynObject;
