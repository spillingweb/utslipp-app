import TilsynObjectsTable from '@/components/TilsynObjects/TilsynObjectsTable';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import AppLayout from '@/layouts/AppLayout';
import { Data, TilsynObject } from '@/types';
import { Head } from '@inertiajs/react';
import styles from './Index.module.css';

const TilsynObjects = ({ tilsynObjects }: { tilsynObjects: Data<TilsynObject> }) => {
    return (
        <AppLayout>
            <Head title="Tilsynsobjekter" />
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
