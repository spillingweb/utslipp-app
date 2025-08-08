import Nav from '@/components/Navigation/Nav';
import Flash from '@/components/ui/Flash';
import { usePage } from '@inertiajs/react';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    // const { url } = usePage();
    const { flash } = usePage<{ flash: { success: string | null; error: string | null } }>().props;

    const containerStyle = route().current('map') ? styles.mainContainer : `${styles.mainContainer} ${styles.padding}`;

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
