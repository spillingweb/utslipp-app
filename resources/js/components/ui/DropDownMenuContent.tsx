import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import styles from './DropDownMenuContent.module.css';
import { useInitials } from '@/hooks/use-initials';

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
            <Link className={styles.logOut} method="post" href={route('logout')} as="button" onClick={cleanup}>
                <LogOut height={15} />
                Logg ut
            </Link>
        </div>
    );
};

export default DropDownMenuContent;
