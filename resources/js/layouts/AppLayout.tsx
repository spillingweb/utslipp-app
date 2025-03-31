import Nav from '@/components/Navigation/Nav';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.appGrid}>
            <header className={styles.header}>
                <Nav />
            </header>
            <main className={styles.mainContainer}>{children}</main>
        </div>
    );
}
