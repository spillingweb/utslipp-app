import Nav from '@/components/Navigation/Nav';
import Flash from '@/components/ui/Flash';
import { usePage } from '@inertiajs/react';
import styles from './AppLayout.module.css';
import { SharedData } from '@/types';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { flash } = usePage<SharedData>().props;

    const containerStyle = route().current('map')  ? styles.mainContainer : `${styles.mainContainer} ${styles.padding}`;

    return (
        <div className={styles.appLayout}>
            <Flash message={flash} />

            <header className={styles.header}>
                <Nav />
            </header>
            <main className={containerStyle}>{children}</main>
        </div>
    );
}
