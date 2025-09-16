import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import styles from './UserMenu.module.css';

const UserMenu = () => {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const cleanup = useMobileNavigation();

    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleClickOnDropdownItem = () => {
        setUserMenuOpen(false);
        cleanup();
    };
    return (
        <div>
            <button className={`${styles.userMenuBtn} ${userMenuOpen ? styles.active : ''}`} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                {getInitials(auth.user.name)}
            </button>
            {userMenuOpen && <div className={styles.userMenuContent}>
                <div className={styles.userContent}>
                    <div className={styles.userInitials}>{getInitials(auth.user.name)}</div>
                    <div className={styles.userInfo}>
                        <p className={styles.userName}>{auth.user.name}</p>
                        <p className={styles.userEmail}>{auth.user.email}</p>
                    </div>
                </div>
                <Link className={styles.gridItem} href={route('profile.edit')} onClick={handleClickOnDropdownItem}>
                    <Settings className={styles.icon} size={16} />
                    <span>Profil</span>
                </Link>
                <Link className={styles.gridItem} method="post" href={route('logout')} as="button" onClick={handleClickOnDropdownItem}>
                    <LogOut className={styles.icon} size={16} />
                    <span>Logg ut</span>
                </Link>
            </div>}
        </div>
    );
};

export default UserMenu;
