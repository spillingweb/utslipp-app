import LogoBrand from '@/components/ui/LogoBrand';
import styles from './AuthLayout.module.css';
import Flash from '@/components/ui/Flash';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function AuthLayout({ children, status }: { children: React.ReactNode; status?: string }) {
    const { flash } = usePage<SharedData>().props;
    
    return (
        <div className={styles.authPage}>
            <Flash message={flash} />
            <LogoBrand />
            {children}
            {status && <div className={styles.statusMessage}>{status}</div>}
        </div>
    );
}
