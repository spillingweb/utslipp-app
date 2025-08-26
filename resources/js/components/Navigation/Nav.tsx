import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import LogoBrand from '../ui/LogoBrand';
import styles from './Nav.module.css';
import { SharedData } from '@/types';

const Nav = () => {
    const cleanup = useMobileNavigation();
    const { can } = usePage<SharedData>().props;

    function setClass(isActive: boolean) {
        return isActive ? `${styles.navTab} ${styles.active}` : styles.navTab;
    }

    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <LogoBrand />
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
                    <Link href="/admin" className={setClass(route().current('admin.users') || route().current('admin.roles'))}>
                        Admin
                    </Link>
                )}
            </ul>
            <Link className={styles.logOut} method="post" href={route('logout')} as="button" onClick={cleanup}>
                <LogOut height={15} />
                Logg ut
            </Link>
        </nav>
    );
};

export default Nav;
