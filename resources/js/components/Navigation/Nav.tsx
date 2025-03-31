import { Link, usePage } from '@inertiajs/react';
import Logo from '../../../assets/ringerike-logo.svg';
import styles from './Nav.module.css';

const Nav = () => {
    const { url } = usePage();

    function setClass(isActive: boolean) {
      return isActive ? `${styles.navTab} ${styles.active}` : styles.navTab;
    }  

    return (
        <nav className={styles.nav} aria-label="Main navigation">
            <div className={styles.brand}>
                <img src={Logo} alt="Logo Ringerike kommune" className={styles.logo} />
                <h1>UTSLIPP</h1>
            </div>
            <ul className={styles.navTabs}>
                <Link href="/" prefetch className={setClass(url === '/')}>
                    Kart
                </Link>
                <Link href="/prosjekter" prefetch className={setClass(url === '/prosjekter')}>
                    Tilsynsprosjekter
                </Link>
                <Link href="/frister" prefetch className={setClass(url === '/frister')}>
                    Utgåtte frister
                </Link>
                <Link href="/admin" prefetch className={setClass(url === '/admin')}>
                    Admin
                </Link>
                </ul>
        </nav>
    );
};

export default Nav;
