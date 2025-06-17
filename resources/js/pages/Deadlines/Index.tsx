import DeadlinesTable from '@/components/Deadlines/DeadlinesTable';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import AppLayout from '@/layouts/AppLayout';
import { Data, TilsynObject } from '@/types';
import { Head } from '@inertiajs/react';
import styles from './Index.module.css';

const Deadlines = ({ tilsynObjects }: { tilsynObjects: Data<TilsynObject> }) => {
    return (
        <AppLayout>
            <Head title="Frister" />
            <Heading level={2} className="mb-medium">
                Frister som har gått ut og som må følges opp
            </Heading>
            <div className={styles.searchAndExport}>
                <Input name="search" placeholder="Søk" />
                <Button onClick={() => console.log('Empty')}>Kopier til utklippstavle</Button>
                <Button onClick={() => console.log('Empty')}>Eksporter til Excel</Button>
                <Button onClick={() => console.log('Empty')}>Skriv ut</Button>
            </div>
            <DeadlinesTable tilsynObjects={tilsynObjects.data} />
        </AppLayout>
    );
};

export default Deadlines;
