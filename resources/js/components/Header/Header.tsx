import { useState } from 'react';
import LogoBrand from '../ui/LogoBrand';
import styles from './Header.module.css';
import Nav from './Nav';
import UserMenu from './UserMenu';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuIconClass = menuOpen ? `${styles.menuIcon} ${styles.closeX}` : styles.menuIcon;

    return (
        <header className={styles.header}>
            <div className={menuIconClass} onClick={() => setMenuOpen(!menuOpen)}>
                <span className={styles.menuIconMiddleLine}></span>
            </div>
            <LogoBrand />
            <Nav isOpen={menuOpen} />
            <UserMenu />
        </header>
    );
};

export default Header;
