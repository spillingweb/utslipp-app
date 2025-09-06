import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import DropdownMenu from '../ui/DropdownMenu';
import DropDownMenuContent from '../ui/DropDownMenuContent';
import LogoBrand from '../ui/LogoBrand';
import styles from './Nav.module.css';
import { useState } from 'react';

const Nav = () => {
    const { can, auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false);

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
            <DropdownMenu>
                <button className={`${styles.userMenuBtn} ${dropDownMenuOpen ? styles.active : ''}`} onClick={() => setDropDownMenuOpen(!dropDownMenuOpen)}>
                    {getInitials(auth.user.name)}
                </button>
                {dropDownMenuOpen && <DropDownMenuContent setDropDownMenuOpen={setDropDownMenuOpen} />}
            </DropdownMenu>
        </nav>
    );
};

export default Nav;
