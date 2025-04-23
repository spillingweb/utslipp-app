import AccessGroupTable from '@/components/Admin/AccessGroupTable';
import UserTable from '@/components/Admin/UserTable';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '../components/ui/Heading';
import styles from './Admin.module.css';

export type RoleType = {
    id: number;
    name: string;
}

const Admin = ({ roles }: { roles: RoleType[] }) => {
    const [activeTab, setActiveTab] = useState('users');

    console.log(roles);

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
            {activeTab === 'users' ? <UserTable /> : <AccessGroupTable roles={roles} />}
        </AppLayout>
    );
};

export default Admin;
