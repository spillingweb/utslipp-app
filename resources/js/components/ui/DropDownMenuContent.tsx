import { useInitials } from '@/hooks/use-initials';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import styles from './DropDownMenuContent.module.css';

const DropDownMenuContent = () => {
    const cleanup = useMobileNavigation();
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();

    return (
        <div className={styles.dropDownMenuContent}>
            <div className={styles.userContent}>
                <div className={styles.userInitials}>{getInitials(auth.user.name)}</div>
                <div className={styles.userInfo}>
                    <p className={styles.userName}>{auth.user.name}</p>
                    <p className={styles.userEmail}>{auth.user.email}</p>
                </div>
            </div>
            <Link className={styles.gridItem} href={route('profile.edit')} onClick={cleanup}>
                <Settings className={styles.icon} size={16} />
                <span>Profil</span>
            </Link>
            <Link className={styles.gridItem} method="post" href={route('logout')} as="button" onClick={cleanup}>
                <LogOut className={styles.icon} size={16} />
                <span>Logg ut</span>
            </Link>
        </div>
    );
};

export default DropDownMenuContent;
