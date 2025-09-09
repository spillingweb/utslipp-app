import LogoBrand from '@/components/ui/LogoBrand';
import styles from './AuthLayout.module.css';

export default function AuthLayout({ children, status }: { children: React.ReactNode; status?: string }) {
    return (
        <div className={styles.authPage}>
            <LogoBrand />
            {children}
            {status && <div className={styles.statusMessage}>{status}</div>}
        </div>
    );
}
