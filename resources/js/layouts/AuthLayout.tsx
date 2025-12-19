import Flash from '@/components/ui/Flash';
import LogoBrand from '@/components/ui/LogoBrand';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children, status, withLogo = true }: { children: React.ReactNode; status?: string; withLogo?: boolean }) {
    const { flash } = usePage<SharedData>().props;

    return (
        <div className={styles.authPage}>
            <Flash message={flash} />
            {withLogo && <LogoBrand />}
            {children}
            {status && <div className={styles.statusMessage}>{status}</div>}
        </div>
    );
}
