import AccessGroupTable from '@/components/Admin/AccessGroupTable';
import UserTable from '@/components/Admin/UserTable';
import AppLayout from '@/layouts/AppLayout';
import { useState } from 'react';
import OverlaySection from '../components/OverlaySection';
import Heading from '../components/ui/Heading';
import styles from './Admin.module.css';
import { Head } from '@inertiajs/react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <AppLayout>
          <Head title="Admin" />
            <OverlaySection className={styles.adminContainer}>
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
                {activeTab === 'users' ? <UserTable /> : <AccessGroupTable />}
            </OverlaySection>
        </AppLayout>
    );
};

export default Admin;
