import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link, usePage } from '@inertiajs/react';
import LogoBrand from '../ui/LogoBrand';
import styles from './Nav.module.css';
import { LogOut } from 'lucide-react';

const Nav = () => {
    const { url } = usePage();
    const cleanup = useMobileNavigation();

    function setClass(isActive: boolean) {
        return isActive ? `${styles.navTab} ${styles.active}` : styles.navTab;
    }

    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <LogoBrand />
            <ul className={styles.navTabs}>
                <Link href="/" className={setClass(url === '/')} preserveState>
                    Kart
                </Link>
                <Link href="/prosjekter" className={setClass(url === '/prosjekter')}>
                    Tilsynsprosjekter
                </Link>
                <Link href="/frister" className={setClass(url === '/frister')}>
                    Utgåtte frister
                </Link>
                <Link href="/admin" className={setClass(url === '/admin')}>
                    Admin
                </Link>
            </ul>
            <Link className={styles.logOut} method="post" href={route('logout')} as="button" onClick={cleanup}>
                <LogOut height={15} />
                Logg ut
            </Link>
        </nav>
    );
};

export default Nav;
