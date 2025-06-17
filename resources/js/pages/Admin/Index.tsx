import AccessGroupTable from '@/components/Admin/AccessGroupTable';
import UserTable from '@/components/Admin/UserTable';
import Button from '@/components/ui/Button';
import AppLayout from '@/layouts/AppLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '../../components/ui/Heading';
import styles from './Index.module.css';
import { Data, Role, User } from '@/types';

const Index = ({ roles, users }: { roles: Data<Role>; users: Data<User> }) => {
    const [activeTab, setActiveTab] = useState('users');

    const { flash } = usePage<{ flash: { message: string | null } }>().props;

    const handleCreateUser = () => {
        router.get(route('user.create'));
    };

    return (
        <AppLayout>
            <Head title="Admin" />
            <div className={styles.flexHeader}>
                <Heading level={2}>Admin - Utslipp Ringerike</Heading>
                <Button onClick={handleCreateUser}>+ Legg til bruker</Button>
            </div>
            {flash.message && <div className={styles.flashMessage}>{flash.message}</div>}
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

export default Index;
