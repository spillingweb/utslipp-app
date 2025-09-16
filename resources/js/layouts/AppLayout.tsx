import Flash from '@/components/ui/Flash';
import { usePage } from '@inertiajs/react';
import styles from './AppLayout.module.css';
import { SharedData } from '@/types';
import Header from '@/components/Header/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { flash } = usePage<SharedData>().props;

    let containerStyle = styles.mainContainer;

    if (!route().current('map')) containerStyle += ` ${styles.padding}`;

    return (
        <div className={styles.appLayout}>
            <Flash message={flash} />
            <Header />
            <main className={containerStyle}>{children}</main>
        </div>
    );
}
