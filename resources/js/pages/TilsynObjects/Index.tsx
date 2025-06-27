import TilsynObjectsTable from '@/components/TilsynObjects/TilsynObjectsTable';
import Button from '@/components/ui/Button';
import Flash from '@/components/ui/Flash';
import { Input } from '@/components/ui/Input';
import AppLayout from '@/layouts/AppLayout';
import { Data, TilsynObject } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import styles from './Index.module.css';

const TilsynObjects = ({ tilsynObjects }: { tilsynObjects: Data<TilsynObject> }) => {
    const { flash } = usePage<{ flash: { success: string | null; error: string | null } }>().props;

   return (
        <AppLayout>
            <Head title="Tilsynsobjekter" />
            <Flash message={flash} />
            <div className={styles.searchAndExport}>
                <Input name="search" placeholder="Søk" />
                <Button onClick={() => console.log('Empty')}>Kopier til utklippstavle</Button>
                <Button onClick={() => console.log('Empty')}>Eksporter til Excel</Button>
                <Button onClick={() => console.log('Empty')}>Skriv ut</Button>
            </div>
            <TilsynObjectsTable tilsynObjects={tilsynObjects.data} />
        </AppLayout>
    );
};

export default TilsynObjects;
