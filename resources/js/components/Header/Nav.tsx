import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import styles from './Nav.module.css';

const Nav = ({ isOpen }: { isOpen: boolean }) => {
    const { can } = usePage<SharedData>().props;

    function setClass(isActive: boolean) {
        return isActive ? `${styles.navTab} ${styles.active}` : styles.navTab;
    }

    const navClass = isOpen ? `${styles.nav} ${styles.open}` : styles.nav;

    return (
        <nav className={navClass} aria-label="Main navigation">
            <ul className={styles.navTabs}>
                <Link href="/" className={setClass(route().current('map'))} preserveState>
                    Kart
                </Link>
                <Link href="/tilsynsobjekter" className={setClass(route().current('tilsyn_objects'))}>
                    Tilsynsobjekter
                </Link>
                <Link href="/prosjekter" className={setClass(route().current('projects'))}>
                    Prosjekter
                </Link>
                {can.user_access && (
                    <Link href="/admin" className={setClass(route().current('admin.*'))}>
                        Admin
                    </Link>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
