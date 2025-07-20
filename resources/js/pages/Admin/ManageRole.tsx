import AppLayout from '@/layouts/AppLayout';
import { Role, User } from '@/types';
import { Head } from '@inertiajs/react';

const ROLE_RADIO_OPTIONS = [
    { label: 'Administrator og redigering', value: 'admin' },
    { label: 'Kun redigering', value: 'redigering' },
    { label: 'Kun innsyn', value: 'innsyn' },
];

const ManageRole = ({ role, users }: { role: Role; users: User[] }) => {
    console.log('Role:', role);
    console.log('Users:', users);
    return (
        <AppLayout>
            <Head title="Administrer Roller" />
        </AppLayout>
    );
};

export default ManageRole;
