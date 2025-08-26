import Button from '@/components/ui/Button';
import AppLayout from '@/layouts/AppLayout';
import { Head, router } from '@inertiajs/react';
import styles from './AdminLayout.module.css';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const handleCreateUser = () => {
        router.get(route('user.create'));
    };

    return (
        <AppLayout>
            <Head title="Admin" />
            <div className={styles.flexHeader}>
                <ul className={styles.tabs}>
                    <li>
                        <button
                            className={`${styles.tab} ${route().current('admin.users') ? styles.activeTab : ''}`}
                            onClick={() => router.get(route('admin.users'))}
                        >
                            Brukere
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${styles.tab} ${route().current('admin.roles') ? styles.activeTab : ''}`}
                            onClick={() => router.get(route('admin.roles'))}
                        >
                            Roller
                        </button>
                    </li>
                </ul>
                <Button className={styles.createButton} onClick={handleCreateUser}>
                    + Legg til bruker
                </Button>
            </div>
            {children}
        </AppLayout>
    );
};

export default AdminLayout;
