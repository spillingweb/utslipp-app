import AccessGroupTable from '@/components/Admin/AccessGroupTable';
import UserTable from '@/components/Admin/UserTable';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '../components/ui/Heading';
import styles from './Admin.module.css';

type Data<T> = {
    data: T[];
};

export type Role = {
    id: number;
    name: string;
    description: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
};

const Admin = ({ roles, users }: { roles: Data<Role>; users: Data<User> }) => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <AppLayout>
            <Head title="Admin" />
            <Heading level={2}>Admin - Utslipp Ringerike</Heading>
            <ul className={styles.tabs}>
                <li>
                    <button className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`} onClick={() => setActiveTab('users')}>
                        Brukere
                    </button>
                </li>
                <li>
                    <button className={`${styles.tab} ${activeTab === 'access' ? styles.activeTab : ''}`} onClick={() => setActiveTab('access')}>
                        Tilgangsgrupper
                    </button>
                </li>
            </ul>
            {activeTab === 'users' ? <UserTable users={users.data} /> : <AccessGroupTable roles={roles.data} />}
        </AppLayout>
    );
};

export default Admin;
