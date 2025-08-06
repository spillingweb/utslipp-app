import RolesTable from '@/components/Admin/RolesTable';
import UserTable from '@/components/Admin/UserTable';
import Button from '@/components/ui/Button';
import AppLayout from '@/layouts/AppLayout';
import { Data, Role, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import styles from './Index.module.css';

const Index = ({ roles, users }: { roles: Data<Role>; users: Data<User> }) => {
    const [activeTab, setActiveTab] = useState('users');

    const handleCreateUser = () => {
        router.get(route('user.create'));
    };

    return (
        <AppLayout>
            <Head title="Admin" />
            <div className={styles.flexHeader}>
                <ul className={styles.tabs}>
                    <li>
                        <button className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`} onClick={() => setActiveTab('users')}>
                            Brukere
                        </button>
                    </li>
                    <li>
                        <button className={`${styles.tab} ${activeTab === 'access' ? styles.activeTab : ''}`} onClick={() => setActiveTab('access')}>
                            Roller
                        </button>
                    </li>
                </ul>
                <Button className={styles.createButton} onClick={handleCreateUser}>
                    + Legg til bruker
                </Button>
            </div>
            {activeTab === 'users' ? <UserTable users={users.data} /> : <RolesTable roles={roles.data} />}
        </AppLayout>
    );
};

export default Index;
