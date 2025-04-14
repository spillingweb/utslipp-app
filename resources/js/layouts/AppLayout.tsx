import Nav from '@/components/Navigation/Nav';
import { usePage } from '@inertiajs/react';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();

    const containerStyle = url === '/' ? styles.mainContainer : `${styles.mainContainer} ${styles.padding}`;

    return (
        <div className={styles.appLayout}>
            <header className={styles.header}>
                <Nav />
            </header>
            <main className={containerStyle}>{children}</main>
        </div>
    );
}
